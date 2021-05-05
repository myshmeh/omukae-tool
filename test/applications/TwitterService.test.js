require("dotenv").config({
  path: ".env.test",
});

const util = require("util");
const {
  scrapeUsersLikedPerTweet,
} = require("../../src/application/TwitterService");
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
  it("should crawl Twitter for users liked per tweet", async () => {
    await scrapeUsersLikedPerTweet(process.env.TWITTER_USER_NAME);
  });
});

// afterAll(async () => {
//     await dbHandler.close();
// });
