class VisitedNotificationSet {
  #value;
  #maxSize;

  constructor() {
    this.#value = new Set();
    this.#maxSize = process.env.MAX_NOTIFICATION_SIZE;
  }

  add(notification) {
    this.#value.add(notification.id());
  }

  has(notification) {
    return this.#value.has(notification.id());
  }

  getUnvisitedNotification(notifications) {
    const visitedNotification = notifications.find(
      (notification) => !this.has(notification)
    );
    if (visitedNotification === undefined) return null;
    return visitedNotification;
  }

  size() {
    return this.#value.size;
  }

  isFull() {
    return this.#value.size >= this.#maxSize;
  }

  value() {
    return this.#value;
  }
}

module.exports = VisitedNotificationSet;
