const dataSource = require("../infrastructure/twitter/TwitterDataSource");
const webCrawlingHandler = require("../infrastructure/webcrawler/WebCrawlingHandler");
const { getCookies } = require("./cookie-service");

const getUsersLikedPerTweet = async (username) => {
  await webCrawlingHandler.init();
  const cookie = getCookies(username);
  await webCrawlingHandler.setCookie(cookie);
  const usersLikedPertweet = await dataSource.getUsersLikedPerTweet(
    webCrawlingHandler.page(),
    username
  );
  await webCrawlingHandler.close();
  return usersLikedPertweet;
};

module.exports = {
  getUsersLikedPerTweet,
};
