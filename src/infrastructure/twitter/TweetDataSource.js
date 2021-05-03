const Tweet = require("../../domain/twitter/timeline/Tweet");
const sqlite3Handler = require("../sqlite3/Sqlite3Handler");

const registerTweet = async (tweet) => {
  return await sqlite3Handler.run(
    `insert into tweets(id, text, url) values(?, ?, ?)`,
    [
      tweet.tweetID().value(),
      tweet.tweetText().value(),
      tweet.tweetUrl().value(),
    ]
  );
};

const getTweetById = async (tweetId) => {
  const tweet = await sqlite3Handler.all(`select * from tweets where id = ?`, [
    tweetId.value(),
  ])[0];
  return new Tweet(tweet.id, tweet.text, tweet.url);
};

module.exports = {
  registerTweet,
  getTweetById,
};
