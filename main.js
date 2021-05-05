
require("dotenv").config({
  path: process.env.NODE_ENV !== "production" ? ".env.test" : ".env",
});
require("./src/infrastructure/sqlite3/Sqlite3Handler");

const { logger, loggingPath } = require("./src/context/logger");
const fs = require('fs');
const express = require("express");
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const twitterController = require("./src/presentation/TwitterController");
const usersLikedPerTweetController = require("./src/presentation/UsersLikedPerTweetController");
const omukaeDoneController = require("./src/presentation/OmukaeDoneController");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(morgan("combined", {
  stream: fs.createWriteStream(loggingPath, {flags: 'a'}),
}));

app.use("/twitter", twitterController);
app.use("/reports", usersLikedPerTweetController);
app.use("/omukaes", omukaeDoneController);

app.get("/health", (req, res) => {
  res.send("I am doing well!");
});

app.listen(process.env.PORT, () => {
  logger.info(`omukae tool backend server is listening at ${process.env.PORT}`);
  logger.info(`config: NODE_ENV=${process.env.NODE_ENV}, DB_PATH=${process.env.DB_PATH}, TWITTER_URL=${process.env.TWITTER_URL}`);
});
