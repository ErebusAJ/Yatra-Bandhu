package utils

// Server Log Errors
const(
	RequestBodyError	=	"error binding json"
	MiddlewareError		=	"error retreiving id from middleware"
	DatabaseError		= 	"error processing db query"
	IDParseError		=	"error parisng id to uuid"
	InvalidAcces		= 	"error invalid access level"
	InvalidAuth			= 	"error invalid authorization header"
)

// Client Errors

const(
	JSONError			=	"invalid json body"
	InternalError		=	"internal error"
	NotFoundError		=	"not found"
	UnauthorizedError	=	"unauthorized" 
)