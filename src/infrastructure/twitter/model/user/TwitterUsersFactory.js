const TwitterUsers = require("../../../../domain/twitter/timeline/user/TwitterUsers");
const TwitterUser = require("../../../../domain/twitter/timeline/user/TwitterUser");

const createTwitterUsersFrom = (userObjects) => {
  return new TwitterUsers(
    userObjects.map(
      (user) =>
        new TwitterUser(user.userId, user.userName, user.iconUrl, user.userUrl)
    )
  );
};

module.exports = {
  createTwitterUsersFrom,
};
