require('dotenv').config({
    path: process.env.NODE_ENV !== 'production' ? '.env.test' : '.env',
});
const usersLikedPerTweetController = require("./src/presentation/UsersLikedPerTweetController");

const username = process.argv[2];

(async () => {
  const result = await usersLikedPerTweetController.getUsersLikedPerTweet(
    username
  );
  console.log(result);
})();
