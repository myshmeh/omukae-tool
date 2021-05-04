const OmukaeDone = require("../../domain/omukae/OmukaeDone");
const OmuakeDones = require("../../domain/omukae/OmukaeDones");
const TweetID = require("../../domain/twitter/timeline/TweetID");
const TwitterUserID = require("../../domain/twitter/timeline/user/TwitterUserID");
const sqlite3Handler = require("../sqlite3/Sqlite3Handler");

// TODO this causes an error? use INSERT OR IGNORE instead in sql
// const has = async (tweetId, twitterUserId) => {
//   const [
//     exists,
//   ] = await sqlite3Handler.all(
//     `select exists( select 1 from tweets_x_users where tweet_id = ? and user_id = ? )`,
//     [tweetId.value(), twitterUserId.value()]
//   );
//   return (
//     exists[
//       `select exists( select 1 from tweets_x_users where tweet_id = ? and user_id = ? )`
//     ] > 0
//   );
// };

const updateAsDone = async (tweetId, twitterUserId) => {
  await sqlite3Handler.run(
    `update tweets_x_users 
    set omukae_done = 1 
    where tweet_id = ? and user_id = ?;`,
    [tweetId.value(), twitterUserId.value()]
  );
};

const registerAsNotDone = async (tweetId, twitterUserId) => {
  await sqlite3Handler.run(
    `insert or ignore into tweets_x_users (tweet_id, user_id) values (?, ?);`,
    [tweetId.value(), twitterUserId.value()]
  );
};

const getAllByTweetId = async (tweetId) => {
  const results = await sqlite3Handler.all(
    `select tweet_id, user_id, omukae_done from tweets_x_users where tweet_id = ?;`,
    [tweetId.value()]
  );
  return new OmuakeDones(
    results.map(
      (result) =>
        new OmukaeDone(
          result.omukae_done,
          new TweetID(result.tweet_id),
          new TwitterUserID(result.user_id)
        )
    )
  );
};

module.exports = {
  updateAsDone,
  registerAsNotDone,
  getAllByTweetId,
};
