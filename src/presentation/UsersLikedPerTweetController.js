const service = require("../application/TwitterService");

const getUsersLikedPerTweet = async (username) => {
  return await service.getUsersLikedPerTweet(username);
};

module.exports = {
  getUsersLikedPerTweet,
};
