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
};

const addedLastEvent = cb => {
  dbConnection.query('SELECT events.*, count(attendance.events_id) FROM events FULL JOIN attendance ON events.id=attendance.events_id GROUP BY events.id ORDER BY events.id DESC LIMIT 1',(err,res) => {
    if (err) cb(err);
    else cb(null, res.rows);
  });
};

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

const checkEvent = (event_name="", event_date="", event_time="", venue_name="", cb) => {
  dbConnection.query('SELECT CASE WHEN EXISTS(SELECT * FROM events WHERE event_name=$1 AND event_date=$2 AND event_time=$3  AND venue_name=$4) THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END', [event_name, event_date, event_time, venue_name],(err,res) => {
    if (err) cb(err);
    else cb(null, parseInt(res.rows[0].case));
  })
 };

module.exports= {getHosts, addEvent,searchWithoutHost,searchWithHost, checkEvent, addedLastEvent};
