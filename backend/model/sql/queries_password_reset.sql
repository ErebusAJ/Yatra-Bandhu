-- name: InsertToken :exec
INSERT INTO password_tokens(user_id, token, expires_at)
VALUES($1, $2, $3);

-- name: GetUserToken :one
SELECT * FROM password_tokens
WHERE token=$1;

-- name: DeleteToken :exec
DELETE FROM password_tokens
WHERE token=$1;

-- name: UpdateUserPassword :exec
UPDATE users
SET password_hash=$1
WHERE id=$2;