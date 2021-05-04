const sqlite3 = require("sqlite3").verbose();

class Sqlite3Handler {
  constructor(path) {
    console.log("connecting to", path);
    this.db = new sqlite3.Database(path, (err) => {
      if (err) {
        console.log("could not connect to database", err);
      } else {
        console.log("connected to database");
      }
    });
  }

  reload(path) {
    console.log("reloading", path);
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

const sqlite3Handler = new Sqlite3Handler(process.env.DB_PATH);

module.exports = sqlite3Handler;
