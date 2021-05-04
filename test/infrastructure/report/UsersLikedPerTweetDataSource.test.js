require("dotenv").config({
    path: ".env.test",
});

const util = require("util");
const exec = util.promisify(require('child_process').exec);
const dbHandler = require("../../../src/infrastructure/sqlite3/Sqlite3Handler");
const {getAllUsersLikedPerTweet} = require("../../../src/infrastructure/report/UsersLikedPerTweetDataSource");

beforeAll(async () => {
    const dbname = 'usersLikedPerTweet.db'
    const result = await exec(`npm run test-db-cleanup --dbname=${dbname} && npm run test-db-setup --dbname=${dbname} && npm run test-db-population --dbname=${dbname}`);
    dbHandler.reload(`database/${dbname}`);
});

describe('GOOD SCENARIO', () => {
    it("should get all the users liked per tweet", async () => {
        const usersLikedPerTweet = await getAllUsersLikedPerTweet();
        const jsonObjects = usersLikedPerTweet.toObject();
        expect(typeof usersLikedPerTweet).toBe("object");
        expect(jsonObjects.length).toBe(1);
        expect(jsonObjects[0]).toEqual({
            tweet: { id: 'tweet_id', url: 'url', text: 'text' },
            users: [ {
                id: 'user_id',
                name: 'name',
                iconUrl: 'icon_url',
                url: 'user_url',
            }, {
                id: 'user_id2',
                name: 'name2',
                iconUrl: 'icon_url2',
                url: 'user_url2'
            } ]
        });
    });
});
