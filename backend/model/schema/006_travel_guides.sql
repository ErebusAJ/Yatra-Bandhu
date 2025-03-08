-- +goose Up
CREATE TABLE guides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    bio TEXT NOT NULL ,
    location TEXT NOT NULL,
    expertise TEXT[] NOT NULL,
    rating INT NOT NULL,
    hourly_rate DECIMAL(10,2) NOT NULL,
    available BOOLEAN DEFAULT NOT NULL TRUE ,
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE
);
