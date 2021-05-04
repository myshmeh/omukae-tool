const UsersLikedPerTweet = require("../../domain/report/UsersLikedPerTweet");
const Tweet = require("../../domain/twitter/timeline/Tweet");
const TwitterUser = require("../../domain/twitter/timeline/user/TwitterUser");
const TwitterUsers = require("../../domain/twitter/timeline/user/TwitterUsers");
const sqlite3Handler = require("../sqlite3/Sqlite3Handler");

const getAllUsersLikedPerTweet = async () => {
  const results = await sqlite3Handler.all(
    `select 
        tweets.id as tweet_id,
        tweets.text as tweet_text,
        tweets.url as tweet_url,
        users.id as user_id,
        users.name as user_name,
        users.icon_url as user_icon_url,
        users.user_url as user_url
        from tweets 
        inner join tweets_x_users on tweets_x_users.tweet_id = tweets.id
        inner join users on tweets_x_users.user_id = users.id;
        `
  );
  const usersLikedPerTweet = new UsersLikedPerTweet();
  results.forEach((result) => {
    const tweet = new Tweet(
      result.tweet_id,
      result.tweet_text,
      result.tweet_url
    );
    const user = new TwitterUser(
      result.user_id,
      result.user_name,
      result.user_icon_url,
      result.user_url
    );
    usersLikedPerTweet.setTweet(tweet, new TwitterUsers([user]));
  });
  return usersLikedPerTweet;
};

module.exports = {
  getAllUsersLikedPerTweet,
};
