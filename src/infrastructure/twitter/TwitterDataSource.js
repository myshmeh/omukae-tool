const { saveAsPdf } = require("../../application/screenshot-service");
const UsersLikedPerTweet = require("../../domain/report/UsersLikedPerTweet");
const Tweet = require("../../domain/twitter/timeline/Tweet");
const TwitterUser = require("../../domain/twitter/timeline/user/TwitterUser");
const TwitterUsers = require("../../domain/twitter/timeline/user/TwitterUsers");
const LikeNotificationsFactory = require("./model/notification/LikeNotificationsFactory");
const NotificationID = require("./model/notification/NotificationID");
const VisitedNotificationSet = require("./model/notification/VisitedNotificationSet");
const TweetFactory = require("./model/tweet/TweetFactory");
const TwitterUsersFactory = require("./model/user/TwitterUsersFactory");

const visitedNotificationSet = new Set();

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
        if (await notificationHandle.evaluate(
            (node) =>
                node
                    .querySelector('div[dir="ltr"]').innerText
                    .match(/.*liked [0-9a-z\s]*your Tweet(|s)$/) !== null
        ))
        likeNotificationHandles.push(notificationHandle);
    }
    return likeNotificationHandles;
}

const getUnvisitedNotificationHandle = async (notificationHandles) => {
    // TODO find unvisited notification
    // const succeeded = await page.evaluate(
    //     () => {
    //         const notifications = document.querySelectorAll(
    //             'article[role="article"]'
    //         );
    //         const likeNotifications = fromHTMLElements(notifications);
    //         const notification = visitedNotificationSet.getUnvisitedNotification(
    //             likeNotifications
    //         );

    //         if (notification === null) return false;

    //         notification.htmlElement().click();
    //         visitedNotificationSet.add(notification);
    //         return true;
    //     },
    //     LikeNotificationsFactory.fromHTMLElements,
    //     visitedNotificationSet
    // );
    return notificationHandles[0];
}

const addToVisitedSet = async (notificationHandle) => {
    const innerHTML = await notificationHandle.evaluate((node) => node.innerHTML);
    const notificationId = new NotificationID(innerHTML);
    visitedNotificationSet.add(notificationId.value());
}

const findAndClickUnvisitedLikeNotification = async (page) => {
    console.log('getting notifications..');

    const notificationHandles = await page.$$('article[role="article"]');
    const likeNotificationHandles = await getLikeNotificationHandles(notificationHandles);

    console.log('all notifications:', notificationHandles.length, 'like notifications:', likeNotificationHandles.length);

    const unvisitedNotificationHandle = await getUnvisitedNotificationHandle(likeNotificationHandles);

    await addToVisitedSet(unvisitedNotificationHandle);

    console.log('set:', visitedNotificationSet);

    await unvisitedNotificationHandle.evaluate((node) => node.click());

    return true;
};

const scrollDown = async (page) => {
    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitFor(1000);
};

const getTweetAndUsers = async (page, username) => {
    const tweet = await page.$eval('article[role="article"]', (node, username) => {
        const url = node.querySelector(`a[href^="/${username}/status"]`).href;
        const text = node.querySelector('div[dir="auto"][lang]').textContent;
        return {url, text};
    }, username);
    const users = await page.$$eval('div[data-testid="UserCell"]', (nodes) => 
        nodes.map((node) => ({
            userId: node.querySelector('a[role="link"]').href,//.match(/https:\/\/twitter.com\/(.*)/)[1],
            userUrl: node.querySelector('a[role="link"]').href,
            iconUrl: node.querySelector("img").src,
            userName: node.querySelector('div[dir="auto"] span span').textContent,
        }))
    );

    //TODO scroll for getting all the users

    return {
        tweet: new Tweet(tweet.url, tweet.text, tweet.url),
        users: new TwitterUsers(users.map((user) => new TwitterUser(user.userId, user.userName, user.iconUrl, user.userUrl))),
    };
};

const usersLikedPerTweet = new UsersLikedPerTweet();

const getUsersLikedPerTweet = async (page, username) => {
    await goToTwitter(page);
    await navigateToNotificationTab(page);

    // ensure to render stuffs
    await page.waitFor(1000);

    await saveAsPdf(page, "notificationtab");

    while (1) {
        await findAndClickUnvisitedLikeNotification(page);
        // if (!succeeded && visitedNotificationSet.isFull()) break;
        // if (!succeeded) {
        //     await scrollDown(page);
        //     continue;
        // }

        // ensure to render stuffs
        await page.waitFor(1000);
        await saveAsPdf(page, "timeline");
        
        console.log("getting users..", username)
        const tweetAndUsers = await getTweetAndUsers(page, username);

        await page.click('div[aria-label="Back"]');

        usersLikedPerTweet.setTweet(tweetAndUsers.tweet, tweetAndUsers.users);
        break;
    }
    return usersLikedPerTweet;
};

module.exports = {
    getUsersLikedPerTweet,
};
