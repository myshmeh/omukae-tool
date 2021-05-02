const UsersLikedPerTweet = require("../../domain/report/UsersLikedPerTweet");
const LikeNotificationsFactory = require("./model/notification/LikeNotificationsFactory");
const VisitedNotificationSet = require("./model/notification/VisitedNotificationSet");
const TweetFactory = require("./model/tweet/TweetFactory");
const TwitterUsersFactory = require("./model/user/TwitterUsersFactory");
require("dotenv").config();

const goToTwitter = async (page) => {
  await page.goto(process.env.TWITTER_URL, {
    waitUntil: "networkidle2",
  });

  //TODO take care of not-logged-in case
};

const navigateToNotificationTab = async (page) => {
  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle2" }),
    page.click('a[href="/notifications"]'),
  ]);
};

const visitedNotificationSet = new VisitedNotificationSet();
const findAndClickUnvisitedLikeNotification = async (page) => {
  const succeeded = await page.$$eval(
    'article[role="article"]',
    (notifications, LikeNotificationsFactory, visitedNotificationSet) => {
      const likeNotifications = LikeNotificationsFactory.fromHTMLElements(
        notifications
      );
      const notification = visitedNotificationSet.getUnvisitedNotification(
        likeNotifications
      );

      if (notification === null) return false;

      notification.htmlElement().click();
      visitedNotificationSet.add(notification);
      return true;
    },
    LikeNotificationsFactory,
    visitedNotificationSet
  );
  return succeeded;
};

const scrollDown = async (page) => {
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await page.waitFor(1000);
};

const getTweetAndUsers = async (page) => {
  const tweet = await page.$eval('article[role="article"]', (element) =>
    TweetFactory.fromHTMLElements(element, username)
  );
  const users = await page.$$eval('div[data-testid="UserCell"]', (elements) =>
    TwitterUsersFactory.fromHTMLElements(elements)
  );
  //TODO scroll for getting all the users
  return {
    tweet,
    users,
  };
};

const usersLikedPerTweet = new UsersLikedPerTweet();

const getUsersLikedPerTweet = async (page, username) => {
  await goToTwitter(page);
  await navigateToNotificationTab(page);
  while (1) {
    const succeeded = await findAndClickUnvisitedLikeNotification(page);
    if (!succeeded && visitedNotificationSet.isFull()) break;
    if (!succeeded) {
      await scrollDown(page);
      continue;
    }

    const tweetAndUsers = await getTweetAndUsers(page);

    usersLikedPerTweet.setTweet(tweetAndUsers.tweet, tweetAndUsers.users);
  }
  return usersLikedPerTweet;
};

module.exports = {
  getUsersLikedPerTweet,
};
