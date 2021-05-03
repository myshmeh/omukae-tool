class UsersLikedPerTweet {
  #value;

  constructor() {
    this.#value = new Map();
  }

  setTweet(tweet, users) {
    this.#value.set(tweet.tweetID().value(), {
      tweet: {
        id: tweet.tweetID().value(),
        url: tweet.tweetUrl().value(),
        text: tweet.tweetText().value(),
      },
      users: users.values().map((user) => ({
        id: user.id().value(),
        name: user.userName().value(),
        iconUrl: user.iconUrl().value(),
        url: user.userUrl().value(),
      })),
    });
  }

  toObject() {
    const reportArray = [];
    this.#value.forEach((value) =>
      reportArray.push({
        tweet: value.tweet,
        users: value.users,
      })
    );
    return reportArray;
  }

  value() {
    return this.#value;
  }
}

module.exports = UsersLikedPerTweet;
