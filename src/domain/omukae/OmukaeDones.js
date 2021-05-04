class OmuakeDones {
  #values;

  constructor(omukaeDoneOrNotArray) {
    this.#values = omukaeDoneOrNotArray;
  }

  map(callback) {
    return this.#values.map(callback);
  }

  values() {
    return this.#values;
  }

  getTwitterIdSet(tweetId) {
    const twitterUserIdStrings = this.#values
      .filter((omuakeDone) => omuakeDone.tweetId().is(tweetId))
      .map((omukaeDone) => omukaeDone.twitterUserId().value());
    return new Set(twitterUserIdStrings);
  }

  getTweetIdSet(twitterUserId) {
    const tweetIdStrings = this.#values
      .filter((omukaeDone) => omukaeDone.twitterUserId().is(twitterUserId))
      .map((omukaeDone) => omukaeDone.tweetId().value());
    return new Set(tweetIdStrings);
  }
}

module.exports = OmuakeDones;
