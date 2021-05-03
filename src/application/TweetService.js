const dataSource = require("../infrastructure/twitter/TweetDataSource");

const register = async (tweet) => {
  await dataSource.registerTweet(tweet);
};

const getBy = async (tweetId) => {
  return await dataSource.getTweetById(tweetId);
};

module.exports = {
  register,
  getBy,
};
