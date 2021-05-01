const TweetText = require("./TweetText");
const TweetID = require("./TweetID");

class Tweet {
  #tweetID;
  #tweetText;

  constructor(tweetIDString, tweetTextString) {
    this.#tweetID = new TweetID(tweetIDString);
    this.#tweetText = new TweetText(tweetTextString);
  }

  tweetID() {
    return this.#tweetID;
  }

  tweetText() {
    return this.#tweetText;
  }
}

module.exports = Tweet;
