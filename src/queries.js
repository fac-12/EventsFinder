const dbConnection = require('./database/db_connection.js');

const getHosts = cb => {
  dbConnection.query('SELECT host_name FROM events GROUP BY host_name',(err,res) => {
    if (err) cb(err);
    else cb(null, res.rows);
  })
};

const addEvent = (event_name='', event_date='', event_time='', host_name='', venue_name='', venue_address='', venue_postcode='', event_url='', cb) => {
  dbConnection.query('INSERT INTO events(event_name, event_date, event_time, host_name, venue_name, venue_address, venue_postcode, event_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [event_name, event_date, event_time, host_name, venue_name, venue_address, venue_postcode, event_url], (err, res) => {
    if (err) cb(err);
    else cb(null, res);
  })
}

const searchWithHost = (data,cb) => {
  dbConnection.query(`SELECT events.*, count(attendance.events_id) FROM events FULL JOIN attendance ON events.id=attendance.events_id WHERE host_name='${data['search-host']}' AND event_date>='${data['start-date']}' AND event_date<='${data['end-date']}' GROUP BY events.id ORDER BY events.event_date LIMIT 15`, (err,res) => {
    if (err) cb(err);
    else cb(null, res.rows);
  })
};

const searchWithoutHost = (data,cb) => {
  dbConnection.query(`SELECT events.*, count(attendance.events_id) FROM events FULL JOIN attendance ON events.id=attendance.events_id WHERE event_date>='${data['start-date']}' AND event_date<='${data['end-date']}' GROUP BY events.id ORDER BY events.event_date LIMIT 15`, (err,res) => {
    if (err) cb(err);
    else cb(null, res.rows);
  })
};

module.exports= {getHosts, addEvent,searchWithoutHost,searchWithHost};
