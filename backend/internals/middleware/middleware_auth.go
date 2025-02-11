package middleware

import (
	"strings"

	"github.com/ErebusAJ/YatraBandhu/internals/utils"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"github.com/google/uuid"
)

// AuthMiddleware
// Used for authenticating requests basend on JWT
// verifies using a unique secret key
func AuthMiddleware(signedKey string) gin.HandlerFunc{
	return func(c *gin.Context){
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer"){
			utils.ErrorJSON(c, 401, utils.UnauthorizedError, utils.InvalidAuth, nil)
			c.Abort()
			return
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")
		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error){
			return []byte(signedKey), nil
		})	
		if err != nil {
			utils.ErrorJSON(c, 400, "ivalid token", "invalid token", err)
			c.Abort()
			return
		}

		claims := token.Claims.(jwt.MapClaims)
		tempID := claims["user_id"].(string)

		userID := uuid.MustParse(tempID)
		userRole := claims["user_role"].(string)

		c.Set("userID", userID)
		c.Set("userRole", userRole)
		
		c.Next()
	}
}