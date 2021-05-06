const { logger } = require("../context/logger");
const dataSource = require("../infrastructure/scrapehistory/ScrapeHistoryDataSource");

const isScrapeable = async () => {
    const seconds = await dataSource.getSecondsFromLastScrape();
    logger.info(`${seconds} seconds has been passed from the last scrape`);
    return seconds === -1 || seconds > process.env.SCRAPE_WAITTIME;
};

const registerScrape = async () => {
    await dataSource.registerScrape();
    return Date.now() + process.env.SCRAPE_WAITTIME;
}

module.exports = {
    isScrapeable,
    registerScrape,
}