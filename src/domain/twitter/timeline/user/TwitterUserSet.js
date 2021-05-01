// TODO implement the details later
class TwitterUserSet {
  #value;

  constructor(twitterUsersArray) {
    this.#value = new Set(twitterUsersArray);
  }

  add(twitterUser) {
    this.#value.add(twitterUser);
    return this;
  }

  addAll(twitterUsersArray) {
    return this;
  }

  has(twitterUser) {
    return this.#value.has(twitterUser);
  }

  size() {
    this.#value.size;
  }
}
