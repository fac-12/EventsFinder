BEGIN;

DROP TABLE IF EXISTS hosts, events, users, attendance, comments;

CREATE TABLE hosts (
    id serial PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(100),
    postcode VARCHAR(10),
    phone VARCHAR(15),
    website VARCHAR(100),
    email VARCHAR(50)
)

CREATE TABLE events (
    id serial PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    host_id INTEGER REFERENCES hosts(id) ON UPDATE CASCADE,
    venue VARCHAR(100) NOT NULL,
    duration VARCHAR(50)
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
