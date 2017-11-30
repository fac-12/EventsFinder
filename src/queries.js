const dbConnection = require('./database/db_connection.js');

const getHosts = cb => {
  dbConnection.query('SELECT name FROM hosts',(err,res) => {
    if(err){
      cb(err);
    }else{
      cb(null,res.rows);
    }
  });
};

module.exports= getHosts;
