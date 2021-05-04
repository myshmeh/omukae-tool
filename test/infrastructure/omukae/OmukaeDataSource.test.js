require("dotenv").config({
    path: ".env.test",
});

const util = require("util");
const TweetID = require("../../../src/domain/twitter/timeline/TweetID");
const TwitterUserID = require("../../../src/domain/twitter/timeline/user/TwitterUserID");
const exec = util.promisify(require('child_process').exec);
const dbHandler = require("../../../src/infrastructure/sqlite3/Sqlite3Handler");
const {register, getAllByTweetId} = require("../../../src/infrastructure/omukae/OmukaeDoneDataSource");

beforeAll(async () => {
    const dbname = 'omukaeDataSourceTest.db'
    const result = await exec(`npm run test-db-cleanup --dbname=${dbname} && npm run test-db-setup --dbname=${dbname} && npm run test-db-population --dbname=${dbname}`);
    dbHandler.reload(`database/${dbname}`);
});

describe('GOOD SCENARIO', () => {
    it('should register a omukae done', async () => {
        await register(new TweetID("tweet_id"), new TwitterUserID("user_id2"));
    });

    it("should get all omukae dones by its tweetId", async () => {
        const omukaeDones = await getAllByTweetId(new TweetID("tweet_id"));
        expect(omukaeDones?.values()?.length).toBe(2);
    });
});