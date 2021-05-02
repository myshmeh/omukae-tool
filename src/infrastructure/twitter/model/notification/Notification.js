const NotificationID = require("./NotificationID");
const NotificationBody = require("./NotificationBody");
const NotificationHeadline = require("./NotificationHeadline");

class Notification {
  #id;
  #htmlElement;

  constructor(htmlElement) {
    this.#id = new NotificationID(htmlElement.innerHTML);
    this.#htmlElement = htmlElement;
  }

  id() {
    return this.#id;
  }

  htmlElement() {
    return this.#htmlElement;
  }
}

module.exports = Notification;
