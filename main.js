
require("dotenv").config({
  path: process.env.NODE_ENV !== "production" ? ".env.test" : ".env",
});
require("./src/infrastructure/sqlite3/Sqlite3Handler");

const { logger } = require("./src/context/logger");
const express = require("express");
const app = express();
const twitterController = require("./src/presentation/TwitterController");

const username = process.env.TWITTER_USER_NAME;

// logger.info(`twitterUrl: ${process.env.TWITTER_URL}, username: ${username}`);

// (async () => {
//   twitterController.scrapeUsersLikedPerTweet(
//     username
//   );
// })();

const logRequest = (req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
}

app.get("/health", logRequest, (req, res) => {
  res.send("I am doing well!");
});

app.post("/twitter/scrape", logRequest, (req, res) => {
  twitterController.scrapeUsersLikedPerTweet(username);
  res.sendStatus(200);
});

app.listen(process.env.PORT, () => {
  logger.info(`omukae tool backend server is listening at ${process.env.PORT}`);
  logger.info(`config: NODE_ENV=${process.env.NODE_ENV}, DB_PATH=${process.env.DB_PATH}, TWITTER_URL=${process.env.TWITTER_URL}`);
});
