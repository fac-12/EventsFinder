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

module.exports= {getHosts, addEvent};