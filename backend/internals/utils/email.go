package utils

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"gopkg.in/gomail.v2"
) 

func SendMail(to, body string) error {
	godotenv.Load()

	email := os.Getenv("EMAIL")
	pass := os.Getenv("PASS")
	if email == "" || pass == ""{
		return fmt.Errorf("unable to fetch credentials")
	}

	m := gomail.NewMessage()

	m.SetHeader("From", email)
	m.SetHeader("To", to)
	m.SetHeader("Subject", "YatraBandhu account password reset !!!")
	m.SetBody("text/plain", body)

	d := gomail.NewDialer("smtp.gmail.com", 587, email, pass)
	err := d.DialAndSend(m)
	if err != nil{
		return fmt.Errorf("unable to send email: %v", err)
	}

	return nil
}