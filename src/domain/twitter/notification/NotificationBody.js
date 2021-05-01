class NotificationBody {
  #value;

  constructor(notificationBodyString) {
    this.#value = notificationBodyString;
  }

  value() {
    return this.#value;
  }
}

module.exports = NotificationBody;
