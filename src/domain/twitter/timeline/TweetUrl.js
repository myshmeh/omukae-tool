class TweetUrl {
  #value;

  constructor(urlString) {
    this.#value = urlString;
  }

  value() {
    return this.#value;
  }
}

module.exports = TweetUrl;
