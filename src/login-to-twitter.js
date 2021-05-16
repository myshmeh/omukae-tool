const puppeteer = require("puppeteer");
const { writeCookies } = require("./application/cookie-service");
const { saveAsPdf } = require("./application/screenshot-service");
require("dotenv").config();

const username = process.argv[2];
const password = process.argv[3];

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox'],
  });
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
  await page.$eval('form input[name="session[username_or_email]"]', (node, username) => node.value = username, username);
  await page.$eval('form input[name="session[password]"]', (node, password) => node.value = password, password);

  console.log('clicking login button');
  await page.click('div[data-testid="LoginForm_Login_Button"]');

  console.log('writing cookie');
  const cookies = await page.cookies();
  writeCookies(cookies, username);

  console.log('screenshot..');
  await saveAsPdf(page, "test");

  await browser.close();
})();
