const Tweet = require("../../domain/twitter/timeline/Tweet");
const sqlite3Handler = require("../sqlite3/Sqlite3Handler");

const registerTweet = async (tweet) => {
  await sqlite3Handler.run(
    `insert or ignore into tweets(id, text, url, datetime) values(?, ?, ?, ?)`,
    [
      tweet.tweetID().value(),
      tweet.tweetText().value(),
      tweet.tweetUrl().value(),
      tweet.tweetedDateTime().value(),
    ]
  );
};

const getTweetById = async (tweetId) => {
  const [tweet] = await sqlite3Handler.all(
    `select * from tweets where id = ?`,
    [tweetId.value()]
  );
  return new Tweet(tweet.id, tweet.text, tweet.url, tweet.datetime);
};

module.exports = {
  registerTweet,
  getTweetById,
};
