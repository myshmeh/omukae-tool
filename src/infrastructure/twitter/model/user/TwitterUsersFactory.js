const TwitterUsers = require("../../../../domain/twitter/timeline/user/TwitterUsers");
const TwitterUser = require("../../../../domain/twitter/timeline/user/TwitterUser");

const fromHTMLElements = (twitterUserElements) => {
  const twitterUsers = twitterUserElements.map((twitterUserElement) => {
    const userId = twitterUserElement
      .querySelector('a[role="link"]')
      .href.match(/https:\/\/twitter.com\/(.*)/)[1];
    const userUrl = twitterUserElement.querySelector('a[role="link"]').href;
    const iconUrl = twitterUserElement.querySelector("img").src;
    const userName = twitterUserElement.querySelector(
      'div[dir="auto"] span span'
    ).textContent;

    return new TwitterUser(userId, userName, iconUrl, userUrl);
  });

  return new TwitterUsers(twitterUsers);
};

module.exports = {
  fromHTMLElements,
};
