require("dotenv").config({
  path: ".env.test",
});

const util = require("util");
const TweetID = require("../../../src/domain/twitter/timeline/TweetID");
const TwitterUserID = require("../../../src/domain/twitter/timeline/user/TwitterUserID");
const exec = util.promisify(require("child_process").exec);
const dbHandler = require("../../../src/infrastructure/sqlite3/Sqlite3Handler");
const {
  updateAsDone,
  registerAsNotDone,
  getAllByTweetId,
} = require("../../../src/infrastructure/omukae/OmukaeDoneDataSource");

beforeAll(async () => {
  const dbname = "omukaeDataSourceTest.db";
  const result = await exec(
    `npm run db-cleanup --dbname=${dbname} && npm run db-setup --dbname=${dbname} && npm run db-population --dbname=${dbname}`
  );
  dbHandler.reload(`database/${dbname}`);
});

describe("GOOD SCENARIO", () => {
  it("should update a omukae status as done", async () => {
    await updateAsDone(new TweetID("tweet_id"), new TwitterUserID("user_id3"));
  });

  it("should register a omukae status as not done", async () => {
    await registerAsNotDone(
      new TweetID("tweet_id"),
      new TwitterUserID("user_id2")
    );
  });

  it("should get all omukae dones by its tweetId", async () => {
    const omukaeDones = await getAllByTweetId(new TweetID("tweet_id"));
    expect(omukaeDones?.values()?.length).toBe(3);
    expect(
      omukaeDones.values().map((omukaeDone) => ({
        tweetId: omukaeDone.tweetId().value(),
        userId: omukaeDone.twitterUserId().value(),
        doneStatus: omukaeDone.doneStatus().isDone(),
      }))
    ).toEqual([
      {
        tweetId: "tweet_id",
        userId: "user_id",
        doneStatus: false,
      },
      {
        tweetId: "tweet_id",
        userId: "user_id2",
        doneStatus: false,
      },
      {
        tweetId: "tweet_id",
        userId: "user_id3",
        doneStatus: true,
      },
    ]);
  });
});

// afterAll(async () => {
//     await dbHandler.close();
//  });
