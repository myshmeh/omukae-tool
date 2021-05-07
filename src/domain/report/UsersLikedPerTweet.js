class UsersLikedPerTweet {
  #value;

  constructor() {
    this.#value = new Map();
  }

  setTweet(tweet, users) {
    const tweetId = tweet.tweetID().value();

    if (this.#value.has(tweetId)) {
      this.#value.set(tweetId, {
        tweet: this.#value.get(tweetId).tweet,
        users: this.#value.get(tweetId).users.concat(
          users.values().map((user) => ({
            id: user.id().value(),
            name: user.userName().value(),
            iconUrl: user.iconUrl().value(),
            url: user.userUrl().value(),
          }))
        ),
      });
      return;
    }

    this.#value.set(tweetId, {
      tweet: {
        id: tweetId,
        url: tweet.tweetUrl().value(),
        text: tweet.tweetText().value(),
        dateTime: tweet.tweetedDateTime().value(),
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
