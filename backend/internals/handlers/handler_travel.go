package handlers

import (
	// "fmt"

	"regexp"

	"github.com/ErebusAJ/YatraBandhu/internals/db"
	"github.com/ErebusAJ/YatraBandhu/internals/utils"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// addTravelDetails
// Adds travel plan parameters to database
func(cfg *apiConfig) addTravelDetails(c *gin.Context){
	var reqDetails struct{
		Place		string		`json:"place" binding:"required"`
		StartDate	string		`json:"start_date" binding:"required"`
		EndDate		string		`json:"end_date" binding:"required"`
		TripType	string		`json:"trip_type" binding:"required"`
		Pets		bool		`json:"pets"`
		Interestes 	[]string	`json:"interests" binding:"required"` 
	}
	err := c.BindJSON(&reqDetails)
	if err != nil {
		utils.ErrorJSON(c, 400, utils.RequestBodyError, utils.JSONError, err)
		return
	}

	// Check if date in right format 
	pattern := `^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$`
	re, err := regexp.Compile(pattern)
	if err != nil{
		utils.ErrorJSON(c, 500, utils.ParsingError, utils.InternalError, err)
		return
	}

	if(!re.MatchString(reqDetails.StartDate) || !re.MatchString(reqDetails.EndDate)){
		utils.ErrorJSON(c, 400, utils.RequestBodyError, utils.JSONError, nil)
		return
	}

	tempID, exists := c.Get("userID")
	if !exists {
		utils.ErrorJSON(c, 400, utils.MiddlewareError, utils.UnauthorizedError, nil)
		return
	}
	userID := tempID.(uuid.UUID)



	err = cfg.DB.AddTravelDetails(c, db.AddTravelDetailsParams{
		CreatorID: userID,
		Place: reqDetails.Place,
		StartDate: reqDetails.StartDate,
		EndDate: reqDetails.EndDate,
		TripType: reqDetails.TripType,
		Pets: reqDetails.Pets,
		Interests: reqDetails.Interestes,
	})
	if err != nil{
		utils.ErrorJSON(c, 500, utils.DatabaseError, utils.InternalError, err)
		return
	}

	c.IndentedJSON(200, utils.MessageObj("addition success"))
}


// getUserPlansDetails
// Retrieves users plans and its details
func(cfg *apiConfig) getUserPlansDetails(c *gin.Context){
	tempID, exists := c.Get("userID")
	if !exists {
		utils.ErrorJSON(c, 400, utils.MiddlewareError, utils.UnauthorizedError, nil)
		return
	}
	userID := tempID.(uuid.UUID)

	plans, err := cfg.DB.GetUserPlansDetails(c, userID)
	if err != nil{
		utils.ErrorJSON(c, 500, utils.DatabaseError, utils.InternalError, err)
		return
	}

	c.IndentedJSON(200, plans)
}
