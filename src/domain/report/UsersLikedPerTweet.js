class UsersLikedPerTweet {
  #value;

  constructor() {
    this.#value = new Map();
  }

  setTweet(tweet, users) {
    this.#value.set(tweet.tweetID(), {
      tweet: {
        id: tweet.tweetID(),
        url: tweet.tweetUrl(),
        text: tweet.tweetText(),
      },
      users: users.map((user) => ({
        id: user.id(),
        name: user.userName(),
        iconUrl: user.iconUrl(),
        url: user.userUrl(),
      })),
    });
  }

  value() {
    return this.#value;
  }
}

module.exports = UsersLikedPerTweet;
