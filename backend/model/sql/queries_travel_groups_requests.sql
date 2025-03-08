-- name: SendRequest :exec
INSERT INTO travel_groups_requests(group_id, user_id)
VALUES($1, $2);

-- name: UpdateRequest :exec
UPDATE travel_groups_requests
SET status=$1
WHERE group_id=$2 AND user_id=$3;

-- name: RejectRequest :exec
DELETE FROM travel_groups_requests
WHERE group_id=$1 AND user_id=$2;

-- name: GetUserGroupRequests :many
SELECT r.id AS request_id, r.group_id, g.name, u.id AS sender_id, u.name AS sender_name, r.status, r.created_at
FROM travel_groups_requests as r
JOIN travel_groups g ON r.group_id = g.id
JOIN users u ON r.user_id = u.id
WHERE g.creator_id =$1
AND r.status = 'pending'
ORDER BY r.created_at DESC;



