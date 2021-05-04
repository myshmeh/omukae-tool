class OmukaeDone {
  #done;
  #tweetId;
  #twitterUserId;

  constructor(doneBoolean, tweetId, twitterUserId) {
    this.#done = doneBoolean;
    this.#tweetId = tweetId;
    this.#twitterUserId = twitterUserId;
  }

  done() {
    return this.#done;
  }

  tweetId() {
    return this.#tweetId;
  }

  twitterUserId() {
    return this.#twitterUserId;
  }
}

module.exports = OmukaeDone;
