package handlers

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"time"

	"github.com/ErebusAJ/YatraBandhu/internals/db"
	"github.com/ErebusAJ/YatraBandhu/internals/utils"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

// registerUser
// Registers user's details to server
func(cfg *apiConfig) registerUser(c *gin.Context){
	var reqDetails struct{
		Name 		string	`json:"name" binding:"required"`
		Age			int		`json:"age" binding:"required"`
		PhoneNum	string	`json:"phone_no" binding:"required"`
		Email		string	`json:"email" binding:"required,email"`
		Password	string	`json:"password" binding:"required"`
	}

	err := c.ShouldBind(&reqDetails)
	if err != nil{
		utils.ErrorJSON(c, 400, utils.RequestBodyError, utils.JSONError, err)
		return
	}

	hashedPass, err := utils.HashPassword(reqDetails.Password)
	if err != nil{
		utils.ErrorJSON(c, 500, "unable to hash password", utils.InternalError, err)
		return
	}

	err = cfg.DB.RegisterUser(c, db.RegisterUserParams{
		Name: reqDetails.Name,
		Age: int32(reqDetails.Age),
		PhoneNumber: reqDetails.PhoneNum,
		Email: reqDetails.Email,
		PasswordHash: hashedPass,
	})
	if err != nil{
		utils.ErrorJSON(c, 500, utils.DatabaseError, utils.InternalError, err)
		return
	}

	c.IndentedJSON(201, utils.MessageObj("user successfully registered"))
}


// loginUser
// logs in a user and returns a JWT
func(cfg *apiConfig) loginUser(c *gin.Context){
	var reqDetails struct{
		Email		string	`json:"email" binding:"required"`
		Password 	string	`json:"password" binding:"required"`
	}

	err := c.ShouldBind(&reqDetails)
	if err != nil{
		utils.ErrorJSON(c, 400, utils.RequestBodyError, utils.JSONError, err)
		return
	}

	user, err := cfg.DB.GetUserByEmail(c, reqDetails.Email)
	if err != nil || err == sql.ErrNoRows{
		utils.ErrorJSON(c, 401, utils.UnauthorizedError, utils.UnauthorizedError, err)
		return
	}
	log.Printf("Entered Password: %v", reqDetails.Password)
	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(reqDetails.Password))
	if err != nil{
		utils.ErrorJSON(c, 401, utils.UnauthorizedError, utils.UnauthorizedError, err)
		return
	}
	
	token, err := utils.GenerateJWT(user.ID, user.AccessLevel.String)
	if err != nil{
		utils.ErrorJSON(c, 500, "error generating token", utils.InternalError, err)
		return
	}

	c.IndentedJSON(200, gin.H{"token":token})
}


// getUserByID
// retrieves a logged in userID
func(cfg *apiConfig) getUserByID(c *gin.Context){
	tempID, exists := c.Get("userID")
	if !exists{
		utils.ErrorJSON(c, 401, utils.MiddlewareError, utils.UnauthorizedError, nil)
		return
	}

	userID := tempID.(uuid.UUID)

	user, err := cfg.DB.GetUserByID(c, userID)
	if err != nil{
		utils.ErrorJSON(c, 500, utils.DatabaseError, utils.InternalError, err)
		return 
	}

	c.IndentedJSON(200, user)
}


// updateUser
// Updates a existing user details
func(cfg *apiConfig) updateUser(c *gin.Context){
	// binding request json body
	var reqDetails struct{
		Name		string 	`json:"name"`
		OldPass		string	`json:"old_password"`
		NewPass 	string	`json:"new_password"`
		PhoneNum	string 	`json:"phone_no"`
	}
	err := c.ShouldBind(&reqDetails)
	if err != nil{
		utils.ErrorJSON(c, 400, utils.RequestBodyError, utils.JSONError, err)
		return
	}

	tempID, exists := c.Get("userID")
	if !exists{
		utils.ErrorJSON(c, 401, utils.MiddlewareError, utils.UnauthorizedError, nil)
		return
	}
	userID := tempID.(uuid.UUID)

	// retreive user to fill up empty values if any
	user, err := cfg.DB.GetUserByID(c, userID)
	if err != nil {
		utils.ErrorJSON(c, 500, utils.DatabaseError, utils.InternalError, err)
		return
	}

	var hashedPass string
	if reqDetails.NewPass != ""{
		err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(reqDetails.OldPass))
		if err != nil{
			utils.ErrorJSON(c, 400, "old password doesn't match", utils.UnauthorizedError, err)
			return
		}
		hashedPass, err = utils.HashPassword(reqDetails.NewPass)
		if err != nil{
			utils.ErrorJSON(c, 500, "error hashing new password", utils.InternalError, err)
			return
		}
	}else{
		hashedPass = user.PasswordHash
	}

	if reqDetails.Name == ""{
		reqDetails.Name = user.Name
	}

	if reqDetails.PhoneNum == "" {
		reqDetails.PhoneNum = user.PhoneNumber
	}

	// update user
	err = cfg.DB.UpdateUser(c, db.UpdateUserParams{
		Name: reqDetails.Name,
		PhoneNumber: reqDetails.PhoneNum,
		PasswordHash: hashedPass,
		ID: userID,
	})
	if err != nil{
		utils.ErrorJSON(c, 500, utils.DatabaseError, utils.InternalError, err)
		return
	}

	c.IndentedJSON(204, utils.MessageObj("updated success"))
}


// deleteUser
// Deletes a logged in user from database
func(cfg *apiConfig) deleteUser(c *gin.Context){
	tempID, exists := c.Get("userID")
	if !exists {
		utils.ErrorJSON(c, 400, utils.MiddlewareError, utils.UnauthorizedError, nil)
		return
	}
	userID := tempID.(uuid.UUID)

	err := cfg.DB.DeleteUser(c, userID)
	if err != nil{
		utils.ErrorJSON(c, 500, utils.DatabaseError, utils.InternalError, err)
		return
	}
	
	c.IndentedJSON(204, utils.MessageObj("deleted success"))
}


// resetPasswordRequest
// Sends a request to reset password
// takes user's email sends a email if users exists
func(cfg *apiConfig) resetPasswordRequest(c *gin.Context){
	var reqDetails struct{
		Email	string	`json:"email" binding:"required"`
	}

	err := c.BindJSON(&reqDetails)
	if err != nil{
		utils.ErrorJSON(c, 400, utils.RequestBodyError, utils.JSONError, err)
		return
	}

	user, err := cfg.DB.GetUserByEmail(c, reqDetails.Email)
	if err != nil{
		utils.ErrorJSON(c, 500, utils.DatabaseError, utils.InternalError, err)
		return
	}

	// Insert Token
	token := uuid.NewString()
	expires := time.Now().Add(15 * time.Minute)

	err = cfg.DB.InsertToken(c, db.InsertTokenParams{
		UserID: user.ID,
		Token: token,
		ExpiresAt: expires,
	})
	if err != nil{
		utils.ErrorJSON(c, 500, utils.DatabaseError, utils.InternalError, err)
		return 
	}

	// Send Email with Reset Link
	url := fmt.Sprintf("http://localhost:8080/v1/user/password-reset/%v", token)
	err = utils.SendMail(reqDetails.Email, fmt.Sprintf("Password reset link: %v", url))
	if err != nil{
		utils.ErrorJSON(c, 500, "unable to send mail", "error sending password reset link", err)
		return
	}

	c.IndentedJSON(200, utils.MessageObj("password reset link sent!!!"))
}


// resetPasswordConfirm
// confirms the token from the previous request
// updates password and deletes token
func(cfg *apiConfig) resetPasswordConfirm(c *gin.Context){
	var reqDetails struct{
		NewPassword	string `json:"new_password" binding:"required"` 
	}

	err := c.BindJSON(&reqDetails)
	if err != nil{
		utils.ErrorJSON(c, 400, utils.RequestBodyError, utils.JSONError, err)
		return
	}

	tempToken := c.Param("token")

	token, err := cfg.DB.GetUserToken(context.Background(), tempToken)
	if err != nil{
		utils.ErrorJSON(c, 500, utils.DatabaseError, utils.InternalError, err)
		return 
	}else if err == sql.ErrNoRows{
		c.IndentedJSON(400, gin.H{"msg":"invalid token"})
	}

	if token.ExpiresAt.Before(time.Now()){
		_ = cfg.DB.DeleteToken(c, token.Token)
		utils.ErrorJSON(c, 400, "expired reset token", "invalid/expired token", nil)
		return
	}

	hashedPass, err := utils.HashPassword(reqDetails.NewPassword)
	if err != nil{
		utils.ErrorJSON(c, 500, utils.ParsingError, utils.InternalError, err)
		return
	}

	err = cfg.DB.UpdateUserPassword(context.Background(), db.UpdateUserPasswordParams{
		ID: token.UserID,
		PasswordHash: hashedPass,
	})
	if err != nil{
		utils.ErrorJSON(c, 500, utils.DatabaseError, utils.InternalError, err)
		return
	}

	err = cfg.DB.DeleteToken(c, token.Token)
	if err != nil{
		utils.ErrorJSON(c, 500, utils.DatabaseError, utils.InternalError, err)
		return
	}

	c.IndentedJSON(200, utils.MessageObj("password updation success !!!"))
}