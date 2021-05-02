const usersLikedPerTweetController = require("./src/presentation/UsersLikedPerTweetController");

const username = process.argv[2];

async () => {
  const result = await usersLikedPerTweetController.getUsersLikedPerTweet(
    username
  );
  console.log(result);
};
