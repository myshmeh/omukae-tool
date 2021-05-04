require("dotenv").config({
    path: ".env.test",
});

const util = require("util");
const { getUsersLikedPerTweet } = require("../../src/application/TwitterService");
const exec = util.promisify(require('child_process').exec);
const dbHandler = require("../../src/infrastructure/sqlite3/Sqlite3Handler");

beforeAll(async () => {
    const dbname = 'twitterServiceTest.db'
    const result = await exec(`npm run test-db-cleanup --dbname=${dbname} && npm run test-db-setup --dbname=${dbname} && npm run test-db-population --dbname=${dbname}`);
    dbHandler.reload(`database/${dbname}`);
});

describe('GOOD SCENARIO', () => {
    it('should crawl Twitter for users liked per tweet', async () => {
        const usersLikedPerTweet = await getUsersLikedPerTweet(process.env.TWITTER_USER_NAME);
        const usersLikedPerTweetObject = usersLikedPerTweet?.toObject();
        expect(usersLikedPerTweetObject.length).toBe(1);
        expect(usersLikedPerTweetObject[0].tweet.id).toBe("TNsMImQIYGb986d0oqDKIQuyBPA1eG8xz8EltedI1mU=");
    });
});