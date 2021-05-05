const sqlite3Handler = require("../sqlite3/Sqlite3Handler");

const getSecondsFromLastScrape = async () => {
    const [result] = await sqlite3Handler.all(`select (strftime('%s') - created_at) from scrape_histories order by created_at desc limit 1;`);
    if (result?.[`(strftime('%s') - created_at)`] === undefined) return -1;
    return result[`(strftime('%s') - created_at)`];
};

const registerScrape = async () => {
    await sqlite3Handler.run(`insert into scrape_histories(completed) values(0);`);
}

module.exports = {
    getSecondsFromLastScrape,
    registerScrape,
};
