require("dotenv").config({
    path: ".env.test",
});

const util = require("util");
const exec = util.promisify(require('child_process').exec);
const dbHandler = require("../../../src/infrastructure/sqlite3/Sqlite3Handler");
const {registerTweet, getTweetById} = require("../../../src/infrastructure/twitter/TweetDataSource");
const Tweet = require("../../../src/domain/twitter/timeline/Tweet");
const TweetID = require("../../../src/domain/twitter/timeline/TweetID");

beforeAll(async () => {
    const dbname = 'tweetDataSourceTest.db'
    const result = await exec(`npm run test-db-cleanup --dbname=${dbname} && npm run test-db-setup --dbname=${dbname} && npm run test-db-population --dbname=${dbname}`);
    dbHandler.reload(`database/${dbname}`);
});

describe('GOOD SCENARIO', () => {
    it('should register a tweet', async () => {
        await registerTweet(new Tweet("test", "test", "test"));
    });

    it("should get a tweet by its id", async () => {
        const tweet = await getTweetById(new TweetID("tweet_id"));
        expect(tweet.tweetID().value()).toBe("tweet_id");
        expect(tweet.tweetText().value()).toBe("text");
        expect(tweet.tweetUrl().value()).toBe("url");
    });
});