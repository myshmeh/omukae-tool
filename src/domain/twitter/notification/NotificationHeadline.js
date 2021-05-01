class NotificationHeadline {
  #value;

  constructor(headlineString) {
    this.#value = headlineString;
  }

  value() {
    return this.#value;
  }
}

module.exports = NotificationHeadline;
