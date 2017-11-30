const dbConnection = require('./database/db_connection.js');

const getHosts = cb => {
  dbConnection.query('SELECT host_name FROM events GROUP BY host_name ORDER BY host_name ASC',(err,res) => {
    if(err){
      cb(err);
    }else{
      cb(null,res.rows);
    }
  });
};

module.exports= getHosts;
