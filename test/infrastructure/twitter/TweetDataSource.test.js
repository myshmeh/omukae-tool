require("dotenv").config({
  path: ".env.test",
});

const util = require("util");
const exec = util.promisify(require("child_process").exec);
const dbHandler = require("../../../src/infrastructure/sqlite3/Sqlite3Handler");
const {
  registerTweet,
  getTweetById,
  hasTweet,
} = require("../../../src/infrastructure/twitter/TweetDataSource");
const Tweet = require("../../../src/domain/twitter/timeline/Tweet");
const TweetID = require("../../../src/domain/twitter/timeline/TweetID");

beforeAll(async () => {
  const dbname = "tweetDataSourceTest.db";
  const result = await exec(
    `npm run db-cleanup --dbname=${dbname} && npm run db-setup --dbname=${dbname} && npm run db-population --dbname=${dbname}`
  );
  dbHandler.reload(`database/${dbname}`);
});

describe("GOOD SCENARIO", () => {
  it("should register a tweet", async () => {
    await registerTweet(new Tweet("test", "test", "test"));
  });

  it("should get a tweet by its id", async () => {
    const tweet = await getTweetById(new TweetID("tweet_id"));
    expect(tweet.tweetID().value()).toBe("tweet_id");
    expect(tweet.tweetText().value()).toBe("text");
    expect(tweet.tweetUrl().value()).toBe("url");
  });

  it("should have a tweet", async () => {
    const tweet = new Tweet("test", "test", "test");
    const exists = await hasTweet(tweet.tweetID());
    expect(exists).toBe(true);
  });
});

describe("BAD SCENARIO", () => {
  it("should not register a tweet that already exists", async () => {
    await registerTweet(new Tweet("tweet_id", "text", "url"));
  });
});

afterAll(async () => {
  await dbHandler.close();
});
