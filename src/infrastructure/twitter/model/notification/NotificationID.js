const { createHash } = require("crypto");

class NotificationID {
  #value;

  constructor(notificationInnerHTMLString) {
    const hash = createHash("sha256");
    hash.update(notificationInnerHTMLString);
    this.#value = hash.digest("base64");
  }
}

module.exports = NotificationID;
