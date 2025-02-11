package handlers

import "github.com/gin-gonic/gin"


func(cfg *apiConfig) test(c *gin.Context){
	c.IndentedJSON(200, gin.H{"msg":"test endpoint"})
}