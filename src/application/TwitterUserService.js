const dataSource = require("../infrastructure/twitter/TwitterUserDataSource");

const register = async (tweet, twitterUser) => {
  await dataSource.registerTwitterUser(tweet, twitterUser);
};

const getAllBy = async (tweetId) => {
  return await dataSource.getTwitterUsers(tweetId);
};

module.exports = {
  register,
  getAllBy,
};
