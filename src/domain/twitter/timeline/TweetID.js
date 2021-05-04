class TweetID {
  #value;

  constructor(tweetIdString) {
    this.#value = tweetIdString;
  }

  is(tweetId) {
    return this.#value === tweetId.value();
  }

  value() {
    return this.#value;
  }
}

module.exports = TweetID;
