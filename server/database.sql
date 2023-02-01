CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    usernmae VARCHAR(28) NOT NULL UNIQUE,
    passhash VARCHAR NOT NULL
)
INSRT INTO users(username, passhash) values($1,$2)