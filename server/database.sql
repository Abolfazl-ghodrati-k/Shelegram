CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(28) NOT NULL UNIQUE,
    passhash VARCHAR NOT NULL,
    userId VARCHAR NOT NULL UNIQUE
)
INSRT INTO users(username, passhash) VALUES($1,$2) RETURNING id, username, passhash