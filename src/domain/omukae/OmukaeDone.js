const OmukaeDoneStatus = require("./OmukaeDoneStatus");

class OmukaeDone {
  #doneStatus;
  #tweetId;
  #twitterUserId;

  constructor(doneNumber, tweetId, twitterUserId) {
    this.#doneStatus = new OmukaeDoneStatus(doneNumber);
    this.#tweetId = tweetId;
    this.#twitterUserId = twitterUserId;
  }

  doneStatus() {
    return this.#doneStatus;
  }

  tweetId() {
    return this.#tweetId;
  }

  twitterUserId() {
    return this.#twitterUserId;
  }
}

module.exports = OmukaeDone;
