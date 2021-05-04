const Tweet = require("../../domain/twitter/timeline/Tweet");
const sqlite3Handler = require("../sqlite3/Sqlite3Handler");

const hasTweet = async (tweetId) => {
  const [
    exists,
  ] = await sqlite3Handler.all(
    `select exists( select 1 from tweets where id = ? )`,
    [tweetId.value()]
  );
  return exists["exists( select 1 from tweets where id = ? )"] > 0;
};

const registerTweet = async (tweet) => {
  if (await hasTweet(tweet.tweetID())) return;
  await sqlite3Handler.run(
    `insert into tweets(id, text, url) values(?, ?, ?)`,
    [
      tweet.tweetID().value(),
      tweet.tweetText().value(),
      tweet.tweetUrl().value(),
    ]
  );
};

const getTweetById = async (tweetId) => {
  const [tweet] = await sqlite3Handler.all(
    `select * from tweets where id = ?`,
    [tweetId.value()]
  );
  return new Tweet(tweet.id, tweet.text, tweet.url);
};

module.exports = {
  hasTweet,
  registerTweet,
  getTweetById,
};
