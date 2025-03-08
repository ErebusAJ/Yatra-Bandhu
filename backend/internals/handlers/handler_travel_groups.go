package handlers

import (
	"github.com/ErebusAJ/YatraBandhu/internals/db"
	"github.com/ErebusAJ/YatraBandhu/internals/utils"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// createGroup
// allows a logged in user creates a group
func(cfg *apiConfig) createGroup(c *gin.Context){
	var reqDetails struct{
		Name		string	`json:"name" binding:"required"`
		Description	string	`json:"description" binding:"required"`
		PlanID 		string	`json:"plan_id" binding:"required"`	
	}

	err := c.BindJSON(&reqDetails)
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

	// parsin planID string --> uuid
	planID, err := uuid.Parse(reqDetails.PlanID)
	if err != nil{
		utils.ErrorJSON(c, 500, utils.ParsingError, utils.InternalError, err)
		return
	}

	groupID := uuid.New()
	err = cfg.DB.CreateGroup(c, db.CreateGroupParams{
		ID: groupID,
		CreatorID: userID,
		Name: reqDetails.Name,
		Description: reqDetails.Description,
		PlanID: planID,
	})
	if err != nil{
		utils.ErrorJSON(c, 500, utils.DatabaseError, utils.InternalError, err)
		return 
	}

	// Add creator to group member
	err = cfg.DB.AddUserToGroup(c, db.AddUserToGroupParams{
		GroupID: groupID,
		UserID: userID,
	})
	if err != nil{
		utils.ErrorJSON(c, 500, utils.DatabaseError, utils.InternalError, err)
		return 
	}
	

	c.IndentedJSON(200, utils.MessageObj("group created success!!"))
}  

// updateGroup
// Update details of a group created by user with a certain PlanID
func(cfg *apiConfig) updateGroup(c *gin.Context){
	var reqDetails struct{
		Name		string	`json:"name"`
		Description	string	`json:"description"`
		PlanID 		string	`json:"plan_id" binding:"required"`	
	}

	err := c.BindJSON(&reqDetails)
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

	tempGID := c.Param("groupID")
	groupID, err := uuid.Parse(tempGID)
	if err != nil{
		utils.ErrorJSON(c, 400, utils.ParsingError, utils.EndpointError, err)
		return
	}

	group, err := cfg.DB.GetGroupByID(c, groupID)
	if err != nil{
		utils.ErrorJSON(c, 500, utils.DatabaseError, utils.InternalError, err)
		return
	}
	
	// check if user sending request is the group creator or not 
	if group.CreatorID != userID{
		utils.ErrorJSON(c, 401, utils.InvalidAcces, utils.UnauthorizedError, err)
		return
	}

	if(reqDetails.Name == ""){
		reqDetails.Name = group.Name
	}

	if(reqDetails.Description == ""){
		reqDetails.Description = group.Description
	}

	err = cfg.DB.UpdateGroupByID(c, db.UpdateGroupByIDParams{
		Name: reqDetails.Name,
		Description: reqDetails.Description,
		ID: group.ID,
	})
	if err != nil{
		utils.ErrorJSON(c, 500, utils.DatabaseError, utils.InternalError, err)
		return
	}

	c.IndentedJSON(204, utils.MessageObj("update success!!"))
}


// deleteGroupByID
// deletes a group created by a user
func(cfg *apiConfig) deleteGroupByID(c *gin.Context){
	tempGID := c.Param("groupID")
	groupID, err := uuid.Parse(tempGID)
	if err != nil{
		utils.ErrorJSON(c, 400, utils.ParsingError, utils.EndpointError, err)
		return
	}

	//get userID
	tempUID, exists := c.Get("userID")
	if !exists {
		utils.ErrorJSON(c, 401, utils.MiddlewareError, utils.UnauthorizedError, nil)
		return
	}
	userID := tempUID.(uuid.UUID)

	//get group creatorID
	group, err := cfg.DB.GetGroupByID(c, groupID)
	if err != nil{
		utils.ErrorJSON(c, 500, utils.DatabaseError, utils.InternalError, err)
		return
	}

	if group.CreatorID != userID{
		utils.ErrorJSON(c, 401, utils.InvalidAcces, utils.UnauthorizedError, nil)
		return
	}

	err = cfg.DB.DeleteGroupByID(c, groupID)
	if err != nil{
		utils.ErrorJSON(c, 500, utils.DatabaseError, utils.InternalError, err)
		return
	}

	c.IndentedJSON(204, utils.MessageObj("deletion success!!!"))
}


// Group Members Handlers

// addGroupMember
// adds a user to an existing group
func(cfg *apiConfig) addGroupMember(c *gin.Context){
	tempGID := c.Param("groupID")
	groupID, err := uuid.Parse(tempGID)

	if err != nil{
		utils.ErrorJSON(c, 400, utils.ParsingError, utils.EndpointError, err)
		return
	}

	tempUID := c.Param("userID")
	userID, err := uuid.Parse(tempUID)
	if err != nil{
		utils.ErrorJSON(c, 400, utils.ParsingError, utils.EndpointError, err)
		return
	}

	cfg.DB.AddUserToGroup(c, db.AddUserToGroupParams{
		GroupID: groupID,
		UserID: userID,
	})

	c.IndentedJSON(200, utils.MessageObj("user added successfully!!!"))
}


// deleteGroupMember
// removes a user from group if requested by creator
func(cfg *apiConfig) deleteGroupMember(c *gin.Context){
	temp, exists := c.Get("userID")
	if !exists {
		utils.ErrorJSON(c, 401, utils.MiddlewareError, utils.UnauthorizedError, nil)
		return
	}
	creatorID := temp.(uuid.UUID)


	tempGID := c.Param("groupID")
	groupID, err := uuid.Parse(tempGID)

	if err != nil{
		utils.ErrorJSON(c, 400, utils.ParsingError, utils.EndpointError, err)
		return
	}

	// Checks if request is sent by creator of group
	group, err := cfg.DB.GetGroupByID(c, groupID)
	if err != nil{
		utils.ErrorJSON(c, 500, utils.DatabaseError, utils.InternalError, err)
		return
	}

	if group.CreatorID != creatorID {
		utils.ErrorJSON(c, 401, utils.InvalidAcces, utils.UnauthorizedError, err)
		return
	}

	tempUID := c.Param("userID")
	userID, err := uuid.Parse(tempUID)
	if err != nil{
		utils.ErrorJSON(c, 400, utils.ParsingError, utils.EndpointError, err)
		return
	}

	err = cfg.DB.DeleteUserFromGroup(c, db.DeleteUserFromGroupParams{
		UserID: userID,
		GroupID: groupID,
	})
	if err != nil{
		utils.ErrorJSON(c, 500, utils.DatabaseError, utils.InternalError, err)
		return
	}

	c.IndentedJSON(204, utils.MessageObj("user deleted success!!!"))
}


// getGroupMembersDetails
// returns details all the members of group 
func(cfg *apiConfig) getGroupMembersDetails(c *gin.Context){
	tempGID := c.Param("groupID")
	groupID, err := uuid.Parse(tempGID)
	if err != nil{
		utils.ErrorJSON(c, 400, utils.ParsingError, utils.EndpointError, err)
		return
	}

	members, err := cfg.DB.GetGroupUsersDetails(c, groupID)
	if err != nil{
		utils.ErrorJSON(c, 500, utils.DatabaseError, utils.InternalError, err)
		return
	}

	c.IndentedJSON(200, members)
}


// getUsersGroups
// returns list of groups a user is part of
func(cfg *apiConfig) getUsersGroups(c *gin.Context){
	temp, exists := c.Get("userID")
	if !exists {
		utils.ErrorJSON(c, 401, utils.MiddlewareError, utils.UnauthorizedError, nil)
		return
	}
	userID := temp.(uuid.UUID)

	groups, err := cfg.DB.GetUserGroups(c, userID)
	if err != nil{
		utils.ErrorJSON(c, 500, utils.DatabaseError, utils.InternalError, err)
		return
	}

	c.IndentedJSON(200, groups)
}
