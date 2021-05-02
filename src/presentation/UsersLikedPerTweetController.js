const service = require("../application/TwitterService");

const getUsersLikedPerTweet = async (username) => {
    console.log(process.env.TWITTER_URL);
  return await service.getUsersLikedPerTweet(username);
};

module.exports = {
  getUsersLikedPerTweet,
};
