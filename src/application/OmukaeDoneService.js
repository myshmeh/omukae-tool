const dataSource = require("../infrastructure/omukae/OmukaeDoneDataSource");

const registerAsNotDone = async (tweetId, twitterUserId) => {
  await dataSource.registerAsNotDone(tweetId, twitterUserId);
};

const registerAllTwitterUsersAsNotDone = async (tweetId, twitterUsers) => {
  twitterUsers.forEach(async (user) => {
    await registerAsNotDone(tweetId, user.id());
  });
};

const updateAsDone = async (tweetId, twitterUserId) => {
  await dataSource.updateAsDone(tweetId, twitterUserId);
};

const getAllByTweetId = async (tweetId) => {
  return await dataSource.getAllByTweetId(tweetId);
};

module.exports = {
  registerAllTwitterUsersAsNotDone,
  registerAsNotDone,
  updateAsDone,
  getAllByTweetId,
};
