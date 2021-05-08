const puppeteer = require("puppeteer");
const { writeCookies } = require("./application/cookie-service");
const { saveAsPdf } = require("./application/screenshot-service");
require("dotenv").config();

const username = process.argv[2];
const password = process.argv[3];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36no"
  );

  await page.setViewport({
    width: 1280,
    height: 1024,
    deviceScaleFactor: 1,
  });

  console.log('connecting to', process.env.TWITTER_URL);
  await page.goto(`${process.env.TWITTER_URL}/login`, {
    waitUntil: "networkidle2",
  });

  console.log('typing username and password');
  await page.evaluate(
    (username, password) => {
      document.querySelector(
        'form input[name="session[username_or_email]"]'
      ).value = username;
      document.querySelector(
        'form input[name="session[password]"]'
      ).value = password;
    },
    username,
    password
  );

  console.log('clicking login button');
  await Promise.all([
    // page.waitForNavigation({ waitUntil: "networkidle2" }),
    page.click('div[data-testid="LoginForm_Login_Button"]'),
  ]);

  console.log('writing cookie');
  const cookies = await page.cookies();
  writeCookies(cookies, username);

  console.log('screenshot..');
  await saveAsPdf(page, "test");

  await browser.close();
})();
