const UsersLikedPerTweet = require("../domain/report/UsersLikedPerTweet");
const Tweet = require("../domain/twitter/timeline/Tweet");
const TwitterUser = require("../domain/twitter/timeline/user/TwitterUser");
const {
  getAllUsersLikedPerTweet,
} = require("../infrastructure/report/UsersLikedPerTweetDataSource");
const tweetService = require("./TweetService");
const twitterUserService = require("./TwitterUserService");
const omukaeDoneService = require("./OmukaeDoneService");

const register = async (usersLikedPerTweet) => {
  usersLikedPerTweet.value().forEach(async (tweetAndUsers) => {
    const tweet = new Tweet(
      tweetAndUsers.tweet.id,
      tweetAndUsers.tweet.text,
      tweetAndUsers.tweet.url
    );
    const users = tweetAndUsers.users.map(
      (user) => new TwitterUser(user.id, user.name, user.iconUrl, user.url)
    );
    await tweetService.register(tweet);
    await twitterUserService.registerAll(users);
    await omukaeDoneService.registerAllTwitterUsersAsNotDone(tweet.tweetID(), users);
  });
};

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
  register,
};
