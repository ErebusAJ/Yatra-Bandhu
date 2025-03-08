package utils

import (
	"log"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"github.com/google/uuid"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
)

// MessageObj
// Accepts a string and returns a gin map object to send as response
func MessageObj(msg string) map[string]any{
	return gin.H{"message":msg}
}

// ErrorJSON
// Used to send error response if a handler malfunctions
// and logs error to server
func ErrorJSON(c *gin.Context, code int, server string, client string, err error){
	c.IndentedJSON(code, MessageObj(client))
	log.Printf("%v : %v", server, err)
}


// HashPassword
// Hashes a password string to store in db
// accepts a string and return hash string, error 
func HashPassword(password string) (string, error){
	newPass, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil{
		return "", err
	}

	return string(newPass), nil
}


// GenerateJWT
// generates a JWT (JSON Web Token) for logging in a user
func GenerateJWT(userID uuid.UUID, userRole string) (string, error){
	claims := jwt.MapClaims{
		"user_id" : userID,
		"user_role" : userRole,
		"exp" : time.Now().Add(24 * time.Hour).Unix(),
		"issue_at" : time.Now().Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	godotenv.Load()
	key := os.Getenv("SIGNED_KEY")

	signedToken, err := token.SignedString([]byte(key))
	if err != nil{
		return "", err
	}

	return signedToken, nil
}

