CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(28) NOT NULL UNIQUE,
    passhash VARCHAR NOT NULL,
    userId VARCHAR NOT NULL UNIQUE
);

CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    profile_image_url TEXT,
    bio TEXT,
    first_name TEXT,
    last_name TEXT
);