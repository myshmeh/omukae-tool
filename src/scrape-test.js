const puppeteer = require("puppeteer");

require("dotenv").config();

function isLikeNotification(textContent) {
  return textContent.match(/.*liked [0-9a-z\s]*your (T|Ret)weet(|s)$/) !== null;
}

(async () => {
  // init browser
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: {
      width: 1200,
      height: 800,
      deviceScaleFactor: 1,
    },
  });

  // init page
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36no"
  );

  // goto twitter
  await page.goto(process.env.TWITTER_URL, {
    waitUntil: "networkidle2",
  });

  // login
  await page.evaluate(
    (username, password) => {
      document.querySelector(
        'form input[name="session[username_or_email]"]'
      ).value = username;
      document.querySelector(
        'form input[name="session[password]"]'
      ).value = password;
    },
    process.env.TWITTER_USER_NAME,
    process.env.TWITTER_USER_PASSWORD
  );

  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle2" }),
    page.click('div[data-testid="LoginForm_Login_Button"]'),
  ]);

  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle2" }),
    page.click('a[href="/notifications"]'),
  ]);

  // search like/retweet notification
  await page.waitForSelector('article[role="article"]');

  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await page.waitFor(1000);

  const response = await page.$$eval(
    'article[role="article"]',
    (notifications) =>
      notifications
        .map(
          (notification) =>
            notification.querySelector('div[dir="ltr"]').textContent
        )
        .filter(
          (notificationText) =>
            notificationText.match(
              /.*liked [0-9a-z\s]*your (T|Ret)weet(|s)$/
            ) !== null
        )
  );

  console.log(response);

  // log the resulting place
  await page.pdf({ path: "twitter.pdf", format: "a4" });

  // close the connection
  await browser.close();
})();
