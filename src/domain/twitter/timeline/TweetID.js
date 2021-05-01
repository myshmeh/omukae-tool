class TweetID {
  #value;

  constructor(tweetIDString) {
    this.#value = tweetIDString;
  }

  value() {
    return this.#value;
  }
}

module.exports = TweetID;
