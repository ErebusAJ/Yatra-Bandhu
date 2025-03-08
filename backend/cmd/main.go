package main

import (
	"log"
	"os"

	"github.com/ErebusAJ/YatraBandhu/internals/handlers"
	"github.com/ErebusAJ/YatraBandhu/internals/utils"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	log.Printf("\t\t Starting server... \n")

	// Load godotenv
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("error loading .env \n")
	}

	// Get port
	port := os.Getenv("PORT_NO")
	if port == "" {
		log.Fatalf("unable to start server couldn't get port \n")
	}

	// Open DB connection
	log.Printf("connecting to database... \n")
	DB, err := utils.ConnectDB()
	if err != nil {
		log.Fatalf("%v \n", err)
	}
	log.Printf("connected to database!! \n")
	defer DB.Close()

	// Initilize router
	router := gin.Default()

	handlers.RegisterRoutes(router)

	router.Run(":" + port)
}
