const dataSource = require("../infrastructure/twitter/TwitterUserDataSource");

const register = async (twitterUser) => {
  await dataSource.registerTwitterUser(twitterUser);
};

const registerAll = async (twitterUsers) => {
  twitterUsers.forEach(async (user) => {
    await register(user);
  });
};

const getAllBy = async (tweetId) => {
  return await dataSource.getTwitterUsers(tweetId);
};

module.exports = {
  register,
  registerAll,
  getAllBy,
};
