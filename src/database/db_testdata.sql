BEGIN;

INSERT INTO events(host_name, venue_name, venue_address, venue_postcode, event_name, event_date, event_start_time, event_url) VALUES
    ('Founders and Coders', 'Founders and Coders', '14 Palmers Road, London', 'E2 0SY','Coding for Everyone', '04/12/2017', '18:30', 'https://www.meetup.com/founderscoders/events/nwkhxnywqbgb/'),
    ('Founders and Coders', 'Space4', '4 Fonthill Rd, 1st Floor, London', 'N4 3HF','Coding for Everyone', '04/12/2017', '18:30', 'https://www.meetup.com/founderscoders/events/nwkhxnywqbgb/'),
    ('Founders and Coders', 'Founders and Coders', '14 Palmers Road, London', 'E2 0SY','Coding for Women', '04/12/2017', '18:30', 'https://www.meetup.com/founderscoders/events/nwkhxnywqbgb/'),
    ('ReactJS Girls London', 'Facebook Headquarters', '10 Brock St, Kings Cross', 'NW1 3FG','ReactJS Girls #4 - From React to React Native: How Hard Can It Be?', '12/12/2017', '18:15',''),

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