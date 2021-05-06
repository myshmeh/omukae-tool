const { createHash } = require("crypto");
const Tweet = require("../../../../domain/twitter/timeline/Tweet");

const createTweetFrom = (tweetObject) => {
  const hash = createHash("sha256");
  hash.update(tweetObject.url);
  return new Tweet(hash.digest("base64url"), tweetObject.text, tweetObject.url);
};

module.exports = {
  createTweetFrom,
};
