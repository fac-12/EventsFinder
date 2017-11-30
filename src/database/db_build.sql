BEGIN;

DROP TABLE IF EXISTS events, users, attendance, comments;

CREATE TABLE events (
    id serial PRIMARY KEY,
    host_name VARCHAR(100) NOT NULL,
    host_email VARCHAR(100) NOT NULL,
    host_url VARCHAR(100) NOT NULL,
    venue_name VARCHAR(100) NOT NULL,
    venue_address VARCHAR(100) NOT NULL,
    venue_postcode VARCHAR(10) NOT NULL,
    event_name VARCHAR(100) NOT NULL,
    event_date DATE NOT NULL,
    event_start_time TIME NOT NULL,
    event_end_time TIME,
    event_url VARCHAR(100)
);

CREATE TABLE users (
    id serial PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(50) NOT NULL
);

CREATE TABLE attendance (
    events_id INTEGER REFERENCES events(id) ON UPDATE CASCADE,
    users_id INTEGER REFERENCES users(id) ON UPDATE CASCADE
);

CREATE TABLE comments (
    id serial PRIMARY KEY,
    events_id INTEGER REFERENCES events(id) ON UPDATE CASCADE,
    users_id INTEGER REFERENCES users(id) ON UPDATE CASCADE,
    comment TEXT
);

COMMIT;