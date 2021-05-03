const sqlite3 = require("sqlite3");

class Sqlite3Handler {
  constructor(path) {
    this.db = new sqlite3.Database(path, (err) => {
      if (err) {
        console.log("could not connect to database", err);
      } else {
        console.log("connected to database");
      }
    });
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          console.log("Error running sql " + sql);
          console.log(err);
          reject(err);
        }
        resolve({ lastID: this.lastID });
      });
    });
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, res) => {
        if (err) {
          console.log(err);
          reject(err);
        } else resolve(res);
      });
    });
  }
}

module.exports = new Sqlite3Handler("../../../database/omukae-tool.db");
