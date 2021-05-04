const dataSource = require("../infrastructure/twitter/TweetDataSource");

const getBy = async (tweetId) => {
  return await dataSource.getTweetById(tweetId);
};

const register = async (tweet) => {
  await dataSource.registerTweet(tweet);
};

module.exports = {
  register,
  getBy,
};
