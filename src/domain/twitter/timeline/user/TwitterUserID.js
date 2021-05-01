class TwitterUserID {
  #value;

  constructor(twitterUserIDString) {
    this.#value = twitterUserIDString;
  }

  value() {
    return this.#value;
  }
}

module.exports = TwitterUserID;
