const service = require("../application/TwitterService");

const scrapeUsersLikedPerTweet = async (username) => {
  await service.scrapeUsersLikedPerTweet(username);
};

module.exports = {
  scrapeUsersLikedPerTweet,
};
