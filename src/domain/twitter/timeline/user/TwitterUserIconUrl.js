class TwitterUserIconUrl {
  #value;

  constructor(twitterUserIconUrlString) {
    this.#value = twitterUserIconUrlString;
  }

  value() {
    return this.#value;
  }
}

module.exports = TwitterUserIconUrl;
