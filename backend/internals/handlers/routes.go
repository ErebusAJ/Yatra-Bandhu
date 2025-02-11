package handlers

import (
	"log"

	"github.com/ErebusAJ/YatraBandhu/internals/db"
	"github.com/ErebusAJ/YatraBandhu/internals/utils"
	"github.com/gin-gonic/gin"
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
	defer DB.Close()

	newDB := db.New(DB)
	apiCfg := apiConfig{
		DB: newDB,
	}

	r.GET("/v1/test", apiCfg.test)
}
