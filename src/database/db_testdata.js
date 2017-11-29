const fs = require('fs');

const addToDatabase = () => {
  const connection = require('./db_connection');
  const sql = fs.readFileSync(`${__dirname}/db_testdata.sql`).toString();

  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err, "error");
    } else {
      console.log("data added");
    }
  });
};

addToDatabase();

module.exports = addToDatabase;
