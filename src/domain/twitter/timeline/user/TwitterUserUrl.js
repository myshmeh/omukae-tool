class TwitterUserUrl {
  #value;

  constructor(twitterUserUrlString) {
    this.#value = twitterUserUrlString;
  }

  value() {
    return this.#value;
  }
}

module.exports = TwitterUserUrl;
