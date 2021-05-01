class TweetText {
  #value;

  constructor(tweetTextString) {
    this.#value = tweetTextString;
  }

  value() {
    return this.#value;
  }
}

module.exports = TweetText;
