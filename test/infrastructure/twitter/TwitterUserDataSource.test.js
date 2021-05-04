require("dotenv").config({
    path: ".env.test",
});

const util = require("util");
const Tweet = require("../../../src/domain/twitter/timeline/Tweet");
const TweetID = require("../../../src/domain/twitter/timeline/TweetID");
const TwitterUser = require("../../../src/domain/twitter/timeline/user/TwitterUser");
const exec = util.promisify(require('child_process').exec);
const dbHandler = require("../../../src/infrastructure/sqlite3/Sqlite3Handler");
const {registerTwitterUser, getTwitterUsers} = require("../../../src/infrastructure/twitter/TwitterUserDataSource");

beforeAll(async () => {
    const dbname = 'twitterUserDataSourceTest.db'
    const result = await exec(`npm run test-db-cleanup --dbname=${dbname} && npm run test-db-setup --dbname=${dbname} && npm run test-db-population --dbname=${dbname}`);
    dbHandler.reload(`database/${dbname}`);
});

describe('GOOD SCENARIOe', () => {
    it('should register a twitter user', async () => {
        const tweet = new Tweet("tweet_id", "text", "url");
        const user = new TwitterUser("@john_doe", "john doe", "john_doe_icon.com", "john_doe.com");
        await registerTwitterUser(tweet, user);
    });

    it("should get twitter users by tweet id", async () => {
        const twitterUsers = await getTwitterUsers(new TweetID("tweet_id"));
        expect(twitterUsers?.values()?.length).toBe(3);
    });
});