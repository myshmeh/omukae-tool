class TwitterUserID {
  #value;

  constructor(twitterUserIDString) {
    this.#value = twitterUserIDString;
  }

  is(twitterUserId) {
    return this.#value === twitterUserId.value();
  }

  value() {
    return this.#value;
  }
}

module.exports = TwitterUserID;
