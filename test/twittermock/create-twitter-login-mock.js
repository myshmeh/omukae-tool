const puppeteer = require("puppeteer");
const fs = require("fs");
require("dotenv").config();

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 1280,
    height: 1080,
    deviceScaleFactor: 1,
  });
  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36no"
  );

  await page.goto(process.env.TWITTER_URL, {
    waitUntil: "networkidle2",
  });

  const result = await page.evaluate(() => {
    document
      .querySelector('div[data-testid="LoginForm_Login_Button"]')
      .setAttribute("onClick", "location='/home'");
    return {
      bodyWithouScript: document.body.innerHTML.replace(
        /<script[\s\S\n]*<\/script>/,
        ""
      ),
      head: document.head.innerHTML,
    };
  });

  fs.writeFile(
    "test/mockpages/twitter-login.html",
    `<html><head></head><body>${result.bodyWithouScript}</body></html>`,
    (err) => {
      if (err) console.error(err);
    }
  );

  await browser.close();
})();
