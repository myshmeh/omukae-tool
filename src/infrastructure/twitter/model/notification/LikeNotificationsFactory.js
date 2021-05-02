const Notification = require("./Notification");
const Notifications = require("./Notifications");

const fromHTMLElements = (notificationHTMLElementsArray) => {
  const notificationsArray = notificationHTMLElementsArray
    .filter(
      (notification) =>
        notification
          .querySelector('div[dir="ltr"]')
          .textContent.match(/.*liked [0-9a-z\s]*your Tweet(|s)$/) !== null
    )
    .map((notification) => new Notification(notification));

  return new Notifications(notificationsArray);
};

module.exports = {
  fromHTMLElements,
};
