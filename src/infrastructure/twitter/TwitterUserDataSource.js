const TwitterUser = require("../../domain/twitter/timeline/user/TwitterUser");
const TwitterUsers = require("../../domain/twitter/timeline/user/TwitterUsers");
const sqlite3Handler = require("../sqlite3/Sqlite3Handler");

// TODO remove later
// const hasTwitterUser = async (twitterUserId) => {
//   const [
//     exists,
//   ] = await sqlite3Handler.all(
//     `select exists( select 1 from users where id = ? );`,
//     [twitterUserId.value()]
//   );
//   return exists["exists( select 1 from users where id = ? )"] > 0;
// };

const registerTwitterUser = async (twitterUser) => {
  await sqlite3Handler.run(
    `insert or ignore into users(id, name, icon_url, user_url) values(?, ?, ?, ?);`,
    [
      twitterUser.id().value(),
      twitterUser.userName().value(),
      twitterUser.iconUrl().value(),
      twitterUser.userUrl().value(),
    ]
  );
};

const getTwitterUsers = async (tweetId) => {
  const users = await sqlite3Handler.all(
    `select 
    users.id, users.name, users.icon_url, users.user_url 
    from users 
    inner join tweets_x_users on tweets_x_users.user_id = users.id 
    inner join tweets on tweets_x_users.tweet_id = ?;`,
    [tweetId.value()]
  );

  return new TwitterUsers(
    users.map(
      (user) =>
        new TwitterUser(user.id, user.name, user.icon_url, user.user_url)
    )
  );
};

module.exports = {
  registerTwitterUser,
  getTwitterUsers,
};
