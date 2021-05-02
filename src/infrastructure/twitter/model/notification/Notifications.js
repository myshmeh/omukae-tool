require("dotenv").config();

class Notifications {
  #values;

  constructor(notificationsArray) {
    this.#values = notificationsArray;
  }

  forEach(callback) {
    this.#values.forEach(callback);
  }

  find(predicate) {
    this.#values.find(predicate);
  }

  values() {
    return this.#values;
  }
}

module.exports = Notifications;
