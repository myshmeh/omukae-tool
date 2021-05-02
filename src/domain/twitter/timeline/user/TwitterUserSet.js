class TwitterUserSet {
  #value;

  constructor() {
    this.#value = new Set();
  }

  add(twitterUser) {
    this.#value.add(twitterUser.id());
  }

  addAll(twitterUsers) {
    twitterUsers.forEach((user) => this.add(user));
  }

  has(twitterUser) {
    return this.#value.has(twitterUser.id());
  }

  nonSetUserExists(twitterUsers) {
    return twitterUsers.find((user) => this.has(user));
  }

  size() {
    return this.#value.size;
  }
}
