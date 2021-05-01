// TODO implement the details later
class NotificationSet {
  #value;

  constructor(notificationsArray) {
    this.#value = new Set(notificationsArray);
  }

  add(notification) {
    this.#value.add(notification);
  }

  has(notification) {
    return this.#value.has(notification);
  }
}
