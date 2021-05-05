require("dotenv").config({
  path: ".env.test",
});

const util = require("util");
const { register } = require("../../src/application/UsersLikedPerTweetService");
const UsersLikedPerTweet = require("../../src/domain/report/UsersLikedPerTweet");
const Tweet = require("../../src/domain/twitter/timeline/Tweet");
const TwitterUser = require("../../src/domain/twitter/timeline/user/TwitterUser");
const TwitterUsers = require("../../src/domain/twitter/timeline/user/TwitterUsers");
const exec = util.promisify(require("child_process").exec);
const dbHandler = require("../../src/infrastructure/sqlite3/Sqlite3Handler");

beforeAll(async () => {
  const dbname = "twitterServiceTest.db";
  const result = await exec(
    `npm run db-cleanup --dbname=${dbname} && npm run db-setup --dbname=${dbname} && npm run db-population --dbname=${dbname}`
  );
  dbHandler.reload(`database/${dbname}`);
});

describe("GOOD SCENARIO", () => {
  it("should register users liked per tweet", async () => {
    const usersLikedPerTweet = new UsersLikedPerTweet();
    const tweet = new Tweet("tweet_id", "text", "url");
    const users = new TwitterUsers([
      new TwitterUser("user_id", "name", "icon_url", "user_url"),
      new TwitterUser("user_id2", "name2", "icon_url2", "user_url2"),
      new TwitterUser("user_id3", "name3", "icon_url3", "user_url3"),
    ]);
    usersLikedPerTweet.setTweet(tweet, users);
    await register(usersLikedPerTweet);
  });
});

// TODO this causes a race condition?
// afterAll(async () => {
//    await dbHandler.close();
// });
