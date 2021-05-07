const TweetText = require("./TweetText");
const TweetID = require("./TweetID");
const TweetUrl = require("./TweetUrl");
const TweetedDateTime = require("./TweetedDateTime");

class Tweet {
  #tweetID;
  #tweetText;
  #tweetUrl;
  #tweetedDateTime;

  constructor(tweetIdString, tweetTextString, tweetUrlString, tweetedIsoDateTimeString) {
    this.#tweetID = new TweetID(tweetIdString);
    this.#tweetText = new TweetText(tweetTextString);
    this.#tweetUrl = new TweetUrl(tweetUrlString);
    this.#tweetedDateTime = new TweetedDateTime(tweetedIsoDateTimeString);
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

  tweetedDateTime() {
    return this.#tweetedDateTime;
  }
}

module.exports = Tweet;
