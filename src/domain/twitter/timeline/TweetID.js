const { createHash } = require("crypto");

class TweetID {
  #value;

  constructor(tweetIDString) {
    const hash = createHash("sha256");
    hash.update(tweetIDString);
    this.#value = hash.digest("base64");
  }

  value() {
    return this.#value;
  }
}

module.exports = TweetID;
