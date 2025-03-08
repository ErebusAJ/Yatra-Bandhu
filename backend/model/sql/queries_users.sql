-- name: GetUsers :many
SELECT * FROM users;

-- name: RegisterUser :exec
INSERT INTO users(name, age, phone_number, email, password_hash)
VALUES ($1, $2, $3, $4, $5);

-- name: GetUserByID :one
SELECT * FROM users
WHERE id=$1;

-- name: UpdateUser :exec
UPDATE users
SET name=$1, password_hash=$2, phone_number=$3, updated_at=CURRENT_TIMESTAMP
WHERE id=$4;

-- name: DeleteUser :exec
DELETE FROM users
WHERE id=$1;


-- name: GetUserByEmail :one
SELECT id, email, password_hash, access_level FROM users
WHERE email=$1;
