const OmukaeDone = require("../../domain/omukae/OmukaeDone");
const OmuakeDones = require("../../domain/omukae/OmukaeDones");
const TweetID = require("../../domain/twitter/timeline/TweetID");
const TwitterUserID = require("../../domain/twitter/timeline/user/TwitterUserID");
const sqlite3Handler = require("../sqlite3/Sqlite3Handler");

const register = async (tweetId, twitterUserId) => {
  await sqlite3Handler.run(
    `insert into omukae_dones (tweet_id, user_id) values (?, ?);`,
    [tweetId.value(), twitterUserId.value()]
  );
};

const getAllByTweetId = async (tweetId) => {
  const results = await sqlite3Handler.all(
    `select tweet_id, user_id from omukae_dones where tweet_id = ?;`,
    [tweetId.value()]
  );
  return new OmuakeDones(
    results.map(
      (result) =>
        new OmukaeDone(
          true,
          new TweetID(result.tweet_id),
          new TwitterUserID(result.user_id)
        )
    )
  );
};

module.exports = {
  register,
  getAllByTweetId,
};
