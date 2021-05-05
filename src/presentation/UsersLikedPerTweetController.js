const express = require("express");
const router = express.Router();

const usersLikedPerTweetService = require("../application/UsersLikedPerTweetService");

router.get("/", async (req, res) => {
  const usersLikedPerTweet = await usersLikedPerTweetService.getAll();
  res.json(usersLikedPerTweet.toObject());
});

module.exports = router;
