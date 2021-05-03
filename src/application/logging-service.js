const fs = require("fs");

const log = (path, data) => {
  fs.writeFileSync(`${process.env.LOGGING_PATH}${path}`, JSON.stringify(data));
};

const logJsonWithDateTime = (filename, data) => {
  fs.writeFileSync(
    `${process.env.LOGGING_PATH}/${
      process.env.NODE_ENV === "production" ? "prod" : "dev"
    }/${filename}-${new Date()}.json`,
    JSON.stringify(data)
  );
};

module.exports = {
  log,
  logJsonWithDateTime,
};
