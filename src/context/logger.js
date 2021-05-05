const bunyan = require("bunyan");

const loggingPath = `resources/logs/${
  process.env.NODE_ENV === "production" ? "prod" : "dev"
}/server-${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}.log`;

const logger = bunyan.createLogger({
  name: "omukae-tool",
  streams: [
    {
      path: loggingPath,
    },
    {
      stream: process.stdout,
    },
  ],
});

module.exports = {
  logger,
  loggingPath,
};
