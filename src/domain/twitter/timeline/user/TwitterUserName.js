class TwitterUserName {
  #value;

  constructor(userNameString) {
    this.#value = userNameString;
  }

  value() {
    return this.#value;
  }
}

module.exports = TwitterUserName;
