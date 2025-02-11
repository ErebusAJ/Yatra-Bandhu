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

type apiConfig struct{
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
	if signedKey == ""{
		log.Printf("error retrieving signed key \n")
	}

	protected := r.Group("/auth")
	protected.Use(middleware.AuthMiddleware(signedKey))
	{
		protected.GET("/user", apiCfg.getUserByID)
		protected.PUT("/user", apiCfg.updateUser)
		protected.DELETE("/user", apiCfg.deleteUser)
	}
}
