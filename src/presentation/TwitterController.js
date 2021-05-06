const express = require("express");
const router = express.Router();

const service = require("../application/TwitterService");
const scrapeHistoryService = require("../application/ScrapeHistoryService");

router.post("/scrape", async (req, res) => {
  const scrapeable = await scrapeHistoryService.isScrapeable();
  const username = req.body?.username;
  if (username === undefined)
    res.status(400).send("request body is not adequate");
  else if (!scrapeable)
    res.status(400).send("slow down");
  else {
    const scrapeableTime = await scrapeHistoryService.registerScrape();
    service.scrapeUsersLikedPerTweet(username);

    res.json({scrapeableAt: scrapeableTime});
  }
});

module.exports = router;
