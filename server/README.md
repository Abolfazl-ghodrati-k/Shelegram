## Run this SQL command in psql to run app without problem

```sql
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(28) NOT NULL UNIQUE,
    passhash VARCHAR NOT NULL,
    userId VARCHAR NOT NULL UNIQUE
);
```
