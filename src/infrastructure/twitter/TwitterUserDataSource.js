const TwitterUser = require("../../domain/twitter/timeline/user/TwitterUser");
const sqlite3Handler = require("../sqlite3/Sqlite3Handler");

const registerTwitterUser = async (tweet, twitterUser) => {
  await sqlite3Handler.run(
    `insert into users(id, tweet_id, name, icon_url, user_url) values(?, ?, ?, ?, ?)`,
    [
      twitterUser.id().value(),
      tweet.tweetID().value(),
      twitterUser.userName().value(),
      twitterUser.iconUrl().value(),
      twitterUser.userUrl().value(),
    ]
  );
};

const getTwitterUsers = async (tweetId) => {
  const users = await sqlite3Handler.all(
    `select * from users where tweet_id = ?`,
    [tweetId.value()]
  );
  return users.map(
    (user) => new TwitterUser(user.id, user.name, user.icon_url, user.user_url)
  );
};

module.exports = {
  registerTwitterUser,
  getTwitterUsers,
};
