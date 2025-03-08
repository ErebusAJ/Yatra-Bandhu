-- name: AddTravelDetails :exec
INSERT INTO travel_plan_details(creator_id, place, start_date, end_date, trip_type, pets, interests)
VALUES($1, $2, $3, $4, $5, $6, $7);

-- name: GetUserPlansDetails :many
SELECT t.place, t.start_date, t.end_date, t.trip_type, t.pets, t.interests
FROM travel_plan_details as t
INNER JOIN users ON users.id = t.creator_id
WHERE users.id = $1;