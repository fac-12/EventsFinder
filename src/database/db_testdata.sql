BEGIN;

INSERT INTO events(host_name, host_url, host_email) VALUES
    ('Founders and Coders', 'http://www.foundersandcoders.com', 'hello@foundersandcoders.com'),
    ('ReactJS Girls London', 'https://www.meetup.com/ReactJS-Girls-London', '');

INSERT INTO events(venue_name, venue_address, venue_postcode) VALUES
    ('Founders and Coders', '14 Palmers Road, London', 'E2 0SY'),
    ('Space4', '4 Fonthill Rd, 1st Floor, London', 'N4 3HF'),
    ('Facebook Headquarters', '10 Brock St, Kings Cross', 'NW1 3FG');

INSERT INTO events(event_name, event_date, event_start_time, event_end_time, event_url) VALUES
    ('Coding for Everyone', '04/12/2017', '18:30', '20:00', 'https://www.meetup.com/founderscoders/events/nwkhxnywqbgb/'),
    ('Coding for Everyone', '04/12/2017', '18:30', '20:00', 'https://www.meetup.com/founderscoders/events/nwkhxnywqbgb/'),
    ('Coding for Women', '12/12/2017', '18:30', '20:00','https://www.meetup.com/founderscoders/events/nwkhxnywqbgb/'),
    ('ReactJS Girls #4 - From React to React Native: How Hard Can It Be?', '12/12/2017', '18:15', '20:30','');

INSERT INTO users(first_name, last_name, email) VALUES
    ('Shannon', 'W', 'shannon@gmail.com'),
    ('Jem', 'A', 'jem@gmail.com'),
    ('Mo', 'O', 'mo@gmail.com'),
    ('Dragomir', 'C', 'dragomir@gmail.com');

INSERT INTO attendance(events_id, users_id) VALUES
    (3, 1),
    (3, 2),
    (1, 3),
    (2, 4);

INSERT INTO comments(events_id, users_id, comment) VALUES
    (3, 1, 'I will be hosting!');

COMMIT;