-- name: CreateGroup :exec
INSERT INTO travel_groups(id, creator_id, name, description, plan_id)
VALUES($1, $2, $3, $4, $5);

-- name: GetGroupByID :one
SELECT * FROM travel_groups
WHERE id=$1;

-- name: UpdateGroupByID :exec
UPDATE travel_groups
SET name=$1, description=$2, updated_at=CURRENT_TIMESTAMP
WHERE id=$3;

-- name: DeleteGroupByID :exec
DELETE FROM travel_groups
WHERE id=$1;



-- name: AddUserToGroup :exec
INSERT INTO travel_groups_members(group_id, user_id)
VALUES($1, $2);

-- name: DeleteUserFromGroup :exec
DELETE FROM travel_groups_members
WHERE user_id=$1 AND group_id=$2;

-- name: GetGroupUsersDetails :many
SELECT u.id, u.name, u.age, u.phone_number, u.email
FROM users u
INNER JOIN travel_groups_members ON travel_groups_members.user_id = u.id
WHERE travel_groups_members.group_id=$1;

-- name: GetUserGroups :many
SELECT g.id, g.creator_id, g.name, g.description, g.plan_id  FROM travel_groups g
INNER JOIN travel_groups_members t ON t.group_id = g.id
WHERE t.user_id=$1;

