const { saveAsPdf } = require("../../application/screenshot-service");
const UsersLikedPerTweet = require("../../domain/report/UsersLikedPerTweet");
const Tweet = require("../../domain/twitter/timeline/Tweet");
const TwitterUser = require("../../domain/twitter/timeline/user/TwitterUser");
const TwitterUsers = require("../../domain/twitter/timeline/user/TwitterUsers");
const NotificationID = require("./model/notification/NotificationID");
const { logger } = require("../../context/logger");
const { short, middle, long } = require("../../context/waittime");

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

const getLikeNotificationHandles = async (notificationHandles) => {
  const likeNotificationHandles = [];
  for (let i = 0; i < notificationHandles.length; i++) {
    const notificationHandle = notificationHandles[i];
    if (
      await notificationHandle.evaluate(
        (node) =>
          node
            .querySelector('div[dir="ltr"]')
            .innerText.match(/.*liked [0-9a-z\s]*your Tweet(|s)$/) !== null
      )
    )
      likeNotificationHandles.push(notificationHandle);
  }
  return likeNotificationHandles;
};

const getUnvisitedNotificationHandle = async (notificationHandles, index) => {
  if (notificationHandles.length > index) return notificationHandles[index];
  throw new Error(
    `accessing notificationHandles[${index}], but the length is ${notificationHandles.length}`
  );
};

const findAndClickUnvisitedLikeNotification = async (page, index) => {
  logger.info("getting notifications..");

  const notificationHandles = await page.$$('article[role="article"]');
  const likeNotificationHandles = await getLikeNotificationHandles(
    notificationHandles
  );

  logger.info(
    "all notifications:",
    notificationHandles.length,
    "like notifications:",
    likeNotificationHandles.length
  );

  const unvisitedNotificationHandle = await getUnvisitedNotificationHandle(
    likeNotificationHandles,
    index
  );

  await unvisitedNotificationHandle.evaluate((node) => node.click());
};

const scrollDown = async (page) => {
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await page.waitFor(short());
};

const getUsers = async (page) =>
  await page.$$eval('div[data-testid="UserCell"]', (nodes) =>
    nodes.map((node) => ({
      userId: node.querySelector('a[role="link"]').href, //.match(/https:\/\/twitter.com\/(.*)/)[1],
      userUrl: node.querySelector('a[role="link"]').href,
      iconUrl: node.querySelector("img").src,
      userName: node.querySelector('div[dir="auto"] span span').textContent,
    }))
  );

const isTimelineAboutReplyingTweet = async (page) => {
  const text = await page.$$eval(
    'div[data-testid="tweet"] div>div>div>div[dir="auto"]',
    (nodes) => nodes[1].innerText
  );
  logger.info(
    `"${text.substring(0, 10)}.." has been taken as target of timeline check`
  );
  return text.match(/^Replying to/) !== null;
};

const getTweetAndUsers = async (page, username) => {
  const tweet = await page.$eval(
    'article[role="article"]',
    (node, username) => {
      const url = node.querySelector(`a[href^="/${username}/status"]`).href;
      const text = node.querySelector('div[dir="auto"][lang]').textContent;
      return { url, text };
    },
    username
  );
  const users = await getUsers(page);

  while (1) {
    logger.info("scrolling timeline to get all the users..");

    await scrollDown(page);

    const collectedUsers = await getUsers(page);
    const filteredUsers = collectedUsers.filter((collectedUser) => {
      const notFound =
        users.find((user) => collectedUser.userId == user.userId) === undefined;
      return notFound;
    });

    logger.info(
      `collected: ${collectedUsers.length}, new: ${filteredUsers.length}`
    );

    if (filteredUsers.length === 0) break;

    users.concat(filteredUsers);

    logger.info("current total:", users.length);
  }

  return {
    tweet: new Tweet(tweet.url, tweet.text, tweet.url),
    users: new TwitterUsers(
      users.map(
        (user) =>
          new TwitterUser(
            user.userId,
            user.userName,
            user.iconUrl,
            user.userUrl
          )
      )
    ),
  };
};

const usersLikedPerTweet = new UsersLikedPerTweet();

const getUsersLikedPerTweet = async (page, username) => {
  await goToTwitter(page);
  await navigateToNotificationTab(page);

  await page.waitFor(long());

  await saveAsPdf(page, "notificationtab");

  const likeNotificationLength = process.env.MAX_NOTIFICATION_SIZE;
  logger.info("like-notification length:", likeNotificationLength);

  for (let i = 0; i < likeNotificationLength; i++) {
    logger.info("started scraping no.", i, "like notification");
    try {
      await findAndClickUnvisitedLikeNotification(page, i);
    } catch (e) {
      logger.warn(e);
      break;
    }

    await page.waitFor(middle());
    await saveAsPdf(page, "timeline");

    logger.info("checking if it's replying tweet..");
    if (await isTimelineAboutReplyingTweet(page)) {
      logger.warn("found replying tweet, skipping this tweet");
      await page.click('div[aria-label="Back"]');
      await page.waitFor(long());
      continue;
    }

    logger.info("getting users..", username);

    try {
      const tweetAndUsers = await getTweetAndUsers(page, username);
      usersLikedPerTweet.setTweet(tweetAndUsers.tweet, tweetAndUsers.users);
    } catch (e) {
      logger.warn(e);
    }

    await page.click('div[aria-label="Back"]');
    await page.waitFor(middle());
  }

  return usersLikedPerTweet;
};

module.exports = {
  getUsersLikedPerTweet,
};
