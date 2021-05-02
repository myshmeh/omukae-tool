class TwitterUsers {
  #values;

  constructor(twitterUsersArray) {
    this.#values = twitterUsersArray;
  }

  values() {
    return this.#values;
  }

  forEach(callback) {
    return this.#values.forEach(callback);
  }

  find(predicate) {
    this.#values.find(predicate);
  }
}

module.exports = TwitterUsers;
