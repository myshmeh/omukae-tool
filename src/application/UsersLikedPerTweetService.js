const UsersLikedPerTweet = require("../domain/report/UsersLikedPerTweet");
const {
  getAllUsersLikedPerTweet,
} = require("../infrastructure/report/UsersLikedPerTweetDataSource");
const tweetService = require("./TweetService");
const twitterUserService = require("./TwitterUserService");

const getBy = async (tweetId) => {
  const tweet = await tweetService.getBy(tweetId);
  const users = await twitterUserService.getAllBy(tweetId);
  const report = new UsersLikedPerTweet();
  report.setTweet(tweet, users);
  return report;
};

const getAll = async () => {
  return await getAllUsersLikedPerTweet();
};

module.exports = {
  getBy,
  getAll,
};
