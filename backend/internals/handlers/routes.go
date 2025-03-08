package handlers

import (
	"log"
	"os"

	"github.com/ErebusAJ/YatraBandhu/internals/db"
	"github.com/ErebusAJ/YatraBandhu/internals/middleware"
	"github.com/ErebusAJ/YatraBandhu/internals/utils"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

type apiConfig struct {
	DB *db.Queries
}

func RegisterRoutes(r *gin.Engine) {

	// Open up database connection
	DB, err := utils.ConnectDB()
	if err != nil {
		log.Fatalf("%v", err)
	}

	newDB := db.New(DB)
	apiCfg := apiConfig{
		DB: newDB,
	}

	r.POST("/v1/register", apiCfg.registerUser)
	r.POST("/v1/login", apiCfg.loginUser)

	// Load signed key for middleware
	signedKey := os.Getenv("SIGNED_KEY")
	if signedKey == "" {
		log.Printf("error retrieving signed key \n")
	}

	// Authenticated Routes
	protected := r.Group("/auth")
	protected.Use(middleware.AuthMiddleware(signedKey))
	{
		// Users Routes
		protected.GET("/user", apiCfg.getUserByID)
		protected.PUT("/user", apiCfg.updateUser)
		protected.DELETE("/user", apiCfg.deleteUser)

		// Travel Plan Details Routes
		protected.POST("/travel-details", apiCfg.addTravelDetails)
		protected.GET("/travel-details", apiCfg.getUserPlansDetails)

		// Travel Groups and Members
		protected.POST("/travel-group", apiCfg.createGroup)
		protected.PUT("/travel-group/:groupID", apiCfg.updateGroup)
		protected.DELETE("/travel-group/:groupID", apiCfg.deleteGroupByID)
		protected.GET("/travel-group/", apiCfg.getUsersGroups)

		protected.POST("/travel-group/:groupID/member/:userID", apiCfg.addGroupMember)
		protected.GET("/travel-group/:groupID/member", apiCfg.getGroupMembersDetails)
		protected.DELETE("/travel-group/:groupID/member/:userID", apiCfg.deleteGroupMember)

		// requests
		protected.POST("/travel-group/:groupID/request", apiCfg.sendRequest)
		protected.GET("/travel-group/:groupID/request", apiCfg.getUserGroupRequest)
		protected.POST("/travel-group/:groupID/request/:senderID", apiCfg.updateRequest)

	}

	// User Password Reset Routes
	r.POST("v1/user/password-reset", apiCfg.resetPasswordRequest)
	r.POST("v1/user/password-reset/:token", apiCfg.resetPasswordConfirm)

}
