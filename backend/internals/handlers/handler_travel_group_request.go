package handlers

import (
	"github.com/ErebusAJ/YatraBandhu/internals/db"
	"github.com/ErebusAJ/YatraBandhu/internals/utils"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// sendRequest
// sends request to join groups
func(cfg *apiConfig) sendRequest(c *gin.Context){
	tempID, exists := c.Get("userID")
	if !exists {
		utils.ErrorJSON(c, 500, utils.MiddlewareError, utils.UnauthorizedError, nil)
		return 
	}
	senderID := tempID.(uuid.UUID)

	tempGID := c.Param("groupID")
	group_ID, err := uuid.Parse(tempGID)
	if err != nil{
		utils.ErrorJSON(c, 500, utils.ParsingError, utils.InternalError, err)
		return
	}

	err = cfg.DB.SendRequest(c, db.SendRequestParams{
		GroupID: group_ID,
		UserID: senderID,
	})
	if err != nil{
		utils.ErrorJSON(c, 500, utils.DatabaseError, utils.InternalError, err)
		return
	}

	c.IndentedJSON(200, utils.MessageObj("request sent!!"))
}

// updateRequest
// defines action for a request "accept" or "reject"
func(cfg *apiConfig) updateRequest(c *gin.Context){
	var reqDetails struct{
		Action	string `json:"actions" binding:"required"`
	}

	err := c.BindJSON(&reqDetails)
	if err != nil{
		utils.ErrorJSON(c, 400, utils.RequestBodyError, utils.JSONError, err)
		return 
	}

	tempGID := c.Param("groupID")
	group_ID, err := uuid.Parse(tempGID)
	if err != nil{
		utils.ErrorJSON(c, 500, utils.ParsingError, utils.InternalError, err)
		return
	}

	tempiUID := c.Param("senderID")
	sender_id, err := uuid.Parse(tempiUID)
	if err != nil{
		utils.ErrorJSON(c, 500, utils.ParsingError, utils.InternalError, err)
		return
	}

	if reqDetails.Action == "reject"{
		err = cfg.DB.RejectRequest(c, db.RejectRequestParams{
			GroupID: group_ID,
			UserID: sender_id,
		})
		if err != nil{
			utils.ErrorJSON(c, 500, utils.DatabaseError, utils.InternalError, err)
			return
		}

		c.IndentedJSON(201, utils.MessageObj("rejected !!"))
		return
	}else if reqDetails.Action == "accept"{
		err = cfg.DB.AddUserToGroup(c, db.AddUserToGroupParams{
			GroupID: group_ID,
			UserID: sender_id,
		})
		if err != nil{
			utils.ErrorJSON(c, 500, utils.DatabaseError, utils.InternalError, err)
			return
		}
	}
	
	c.IndentedJSON(201, utils.MessageObj("request action success"))
}


// getUserGroupRequest
func(cfg *apiConfig) getUserGroupRequest(c *gin.Context){
	tempID, exists := c.Get("userID")
	if !exists {
		utils.ErrorJSON(c, 500, utils.MiddlewareError, utils.UnauthorizedError, nil)
		return 
	}
	creatorID := tempID.(uuid.UUID)

	requests, err := cfg.DB.GetUserGroupRequests(c, creatorID)
	if err != nil {
		utils.ErrorJSON(c, 500, utils.DatabaseError, utils.InternalError, err)
		return 
	}

	c.IndentedJSON(200, requests)
}