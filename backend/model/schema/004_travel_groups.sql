-- +goose Up
CREATE TABLE travel_groups(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(200) NOT NULL,
    plan_id UUID NOT NULL REFERENCES travel_plan_details(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(creator_id, plan_id)
);

CREATE TABLE travel_groups_members(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),  
    group_id UUID NOT NULL REFERENCES travel_groups(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(group_id, user_id)
);


-- +goose Down

DROP TABLE travel_groups_members;

DROP TABLE travel_groups;