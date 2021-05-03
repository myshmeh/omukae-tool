
require("dotenv").config({
  path: process.env.NODE_ENV !== "production" ? ".env.test" : ".env",
});
const { logger } = require("./src/context/logger");
const usersLikedPerTweetController = require("./src/presentation/UsersLikedPerTweetController");

const username = process.env.TWITTER_USER_NAME;

logger.info({ twitterUrl: process.env.TWITTER_URL, username });

(async () => {
  const result = await usersLikedPerTweetController.getUsersLikedPerTweet(
    username
  );
  logger.info('done.');
  logger.info('result:', result.toObject());
})();
