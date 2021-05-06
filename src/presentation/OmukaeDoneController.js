const express = require("express");
const router = express.Router();

const omukaeDoneService = require("../application/OmukaeDoneService");
const { logger } = require("../context/logger");
const TweetID = require("../domain/twitter/timeline/TweetID");
const TwitterUserID = require("../domain/twitter/timeline/user/TwitterUserID");

router.get("/", async (req, res) => {
  const tweetIdString = req.query?.tweetId;

  if (tweetIdString === undefined)
    res.status(400).send("request query is not adequate");
  else {
    const omukaeDones = await omukaeDoneService.getAllByTweetId(
      new TweetID(tweetIdString)
    );

    res.json(omukaeDones.getDoneTwitterUserIdStrings());
  }
});

router.post("/", async (req, res) => {
  const tweetIdString = req.body?.tweetId;
  const twitterUserIdString = req.body?.userId;

  if (tweetIdString === undefined || twitterUserIdString === undefined)
    res.status(400).send("request body is not adequate");
  else {
    await omukaeDoneService.updateAsDone(
      new TweetID(tweetIdString),
      new TwitterUserID(twitterUserIdString)
    );

    res.sendStatus(200);
  }
});

module.exports = router;
