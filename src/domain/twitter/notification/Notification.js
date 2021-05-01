const NotificationBody = require("./NotificationBody");
const NotificationHeadline = require("./NotificationHeadline");

class Notification {
  #body;
  #headline;

  constructor(headlineString, bodyString) {
    this.#headline = new NotificationHeadline(headlineString);
    this.#body = new NotificationBody(bodyString);
  }

  headline() {
    return this.#headline;
  }

  body() {
    return this.#body;
  }
}

module.exports = Notification;
