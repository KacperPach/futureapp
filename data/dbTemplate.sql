-- insert those commands to create a database in psql shell
CREATE DATABASE movies_db;
-- \c movies_db to connect into movies database
CREATE TABLE movie_list (
    id SERIAL PRIMARY KEY,
    title varchar(255) NOT NULL UNIQUE,
    release_date DATE NOT NULL,
    rating INT CHECK ( rating BETWEEN 1 AND 5)  NOT NULL,
    director varchar(255) NOT NULL,
    genere varchar(255)  NOT NULL
); 