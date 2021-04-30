const puppeteer = require("puppeteer");
const { writeCookies } = require("./applications/cookie-service");
const { saveAsPdf } = require('./applications/screenshot-service');

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

  await page.goto("https://twitter.com", {
    waitUntil: "networkidle2",
  });

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

  await Promise.all([
    page.waitForNavigation({ waitUntil: "networkidle2" }),
    page.click('div[data-testid="LoginForm_Login_Button"]'),
  ]);

  const cookies = await page.cookies();
  writeCookies(cookies, username);

  await savetAsPdf(page, "test")

  await browser.close();
})();
