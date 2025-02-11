package utils

import (
	"database/sql"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

// ConnectDB
// connects with the DB specified by URL in .env
func ConnectDB() (*sql.DB, error) {
	// Load env
	godotenv.Load()

	dbURL := os.Getenv("DB_URL")
	if dbURL == ""{
		log.Fatalf("error connecting to DB couldn't retrieve url")
	}

	// Open connection
	db, err := sql.Open("postgres", dbURL)
	if err != nil{
		return nil, err
	}

	// Ping DB to verify connection
	err = db.Ping() ; if err != nil {
		return nil, err
	}

	return db, nil;
}