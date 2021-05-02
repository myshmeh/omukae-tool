const TweetText = require("./TweetText");
const TweetID = require("./TweetID");
const TweetUrl = require("./TweetUrl");

class Tweet {
  #tweetID;
  #tweetText;
  #tweetUrl;

  constructor(tweetIDString, tweetTextString, tweetUrlString) {
    this.#tweetID = new TweetID(tweetIDString);
    this.#tweetText = new TweetText(tweetTextString);
    this.#tweetUrl = new TweetUrl(tweetUrlString);
  }

  tweetID() {
    return this.#tweetID;
  }

  tweetText() {
    return this.#tweetText;
  }

  tweetUrl() {
    return this.#tweetUrl;
  }
}

module.exports = Tweet;
