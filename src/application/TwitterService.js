const dataSource = require("../infrastructure/twitter/TwitterDataSource");
const webCrawlingHandler = require("../infrastructure/webcrawler/WebCrawlingHandler");
const usersLikedPerTweetService = require("./UsersLikedPerTweetService");
const { getCookies } = require("./cookie-service");
const { logJsonWithDateTime } = require("./logging-service");
const { logger } = require("../context/logger");

const scrapeUsersLikedPerTweet = async (username) => {
  await webCrawlingHandler.init();
  let cookie;
  try {
    cookie = getCookies(username);
  } catch (e) {
    logger.error(e);
    return;
  }
  await webCrawlingHandler.setCookie(cookie);
  const usersLikedPertweet = await dataSource.getUsersLikedPerTweet(
    webCrawlingHandler.page(),
    username
  );
  await webCrawlingHandler.close();

  logJsonWithDateTime(username, usersLikedPertweet.toObject());

  await usersLikedPerTweetService.register(usersLikedPertweet);
};

module.exports = {
  scrapeUsersLikedPerTweet,
};
