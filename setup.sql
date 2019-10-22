DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    profile_url VARCHAR(300),
    bio TEXT
)
