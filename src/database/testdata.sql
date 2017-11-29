BEGIN;

INSERT INTO hosts(name, website, email) VALUES
    ('Founders and Coders', 'http://www.foundersandcoders.com', 'hello@foundersandcoders.com'),
    ('ReactJS Girls London', '', '');

INSERT INTO venues(name, address, postcode) VALUES
    ('Founders and Coders', '14 Palmers Road, London', 'E2 0SY'),
    ('Space4', '4 Fonthill Rd, 1st Floor, London', 'N4 3HF'),
    ('Facebook Headquarters', '', '');

INSERT INTO events(name, date, start_time, end_time, url, host_id, venue_id) VALUES
    ('Coding for Everyone', '04/12/2017', '18:30', '20:00', 'https://www.meetup.com/founderscoders/events/nwkhxnywqbgb/', 1, 1),
    ('Coding for Everyone', '04/12/2017', '18:30', '20:00', 'https://www.meetup.com/founderscoders/events/nwkhxnywqbgb/', 1, 2),
    ('Coding for Women', '12/12/2017', '18:30', '20:00','https://www.meetup.com/founderscoders/events/nwkhxnywqbgb/', 1, 1),
    ('ReactJS Girls #4 - From React to React Native: How Hard Can It Be?', '12/12/2017', '18:15', '20:30','', 2, 3)

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