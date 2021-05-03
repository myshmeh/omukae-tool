const bunyan = require("bunyan");
const logger = bunyan.createLogger({
  name: "omukae-tool",
});

module.exports = {
  logger,
};
