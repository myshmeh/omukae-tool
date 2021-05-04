require("dotenv").config({
  path: ".env.test",
});

const util = require("util");
const Tweet = require("../../../src/domain/twitter/timeline/Tweet");
const TweetID = require("../../../src/domain/twitter/timeline/TweetID");
const TwitterUser = require("../../../src/domain/twitter/timeline/user/TwitterUser");
const TwitterUserID = require("../../../src/domain/twitter/timeline/user/TwitterUserID");
const exec = util.promisify(require("child_process").exec);
const dbHandler = require("../../../src/infrastructure/sqlite3/Sqlite3Handler");
const {
  registerTwitterUser,
  getTwitterUsers,
  hasTwitterUser,
} = require("../../../src/infrastructure/twitter/TwitterUserDataSource");

beforeAll(async () => {
  const dbname = "twitterUserDataSourceTest.db";
  const result = await exec(
    `npm run db-cleanup --dbname=${dbname} && npm run db-setup --dbname=${dbname} && npm run db-population --dbname=${dbname}`
  );
  dbHandler.reload(`database/${dbname}`);
});

describe("GOOD SCENARIO", () => {
  it("should register a twitter user", async () => {
    const user = new TwitterUser(
      "@john_doe",
      "john doe",
      "john_doe_icon.com",
      "john_doe.com"
    );
    await registerTwitterUser(user);
  });

  it("should get twitter users by tweet id", async () => {
    const twitterUsers = await getTwitterUsers(new TweetID("tweet_id"));
    expect(twitterUsers?.values()?.length).toBe(2);
  });

  it("should have a twitter user", async () => {
    const exists = await hasTwitterUser(new TwitterUserID("user_id"));
    expect(exists).toBe(true);
  });
});

describe(`BAD SCENARIO`, () => {
  it("shoud not register a twitter user that already exists", async () => {
    const user = new TwitterUser("user_id", "name", "icon_url", "user_url");
    await registerTwitterUser(user);
  });
});

afterAll(async () => {
  await dbHandler.close();
});
