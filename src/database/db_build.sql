BEGIN;

DROP TABLE IF EXISTS hosts, venues, events, users, attendance, comments;

CREATE TABLE hosts (
    id serial PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    website VARCHAR(100),
    email VARCHAR(50)
)

CREATE TABLE venues (
    id serial PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(100) NOT NULL,
    postcode VARCHAR(10) NOT NULL,
)

CREATE TABLE events (
    id serial PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME,
    url VARCHAR(100),
    host_id INTEGER REFERENCES hosts(id) ON UPDATE CASCADE,
    venue_id INTEGER REFERENCES venues(id) ON UPDATE CASCADE
)

CREATE TABLE users (
    id serial PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(50) NOT NULL
)

CREATE TABLE attendance (
    events_id INTEGER REFERENCES events(id) ON UPDATE CASCADE,
    users_id INTEGER REFERENCES users(id) ON UPDATE CASCADE,
)

CREATE TABLE comments (
    id serial PRIMARY KEY,
    events_id INTEGER REFERENCES events(id) ON UPDATE CASCADE,
    users_id INTEGER REFERENCES users(id) ON UPDATE CASCADE,
    comment TEXT
)

COMMIT;