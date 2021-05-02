const puppeteer = require("puppeteer");
const fs = require("fs");
const { getCookies } = require("../../src/application/cookie-service");
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

  const cookies = getCookies("misumiyui41");
  await page.setCookie.apply(page, cookies);

  await page.goto("https://twitter.com/notifications", {
    waitUntil: "networkidle2",
  });

  const result = await page.evaluate(() => {
    document.querySelectorAll('article[role="article"]').forEach((element) => {
      element.setAttribute(
        "onClick",
        "location='http://localhost:8080/i/timeline'"
      );
    });
    return {
      bodyWithouScript: document.body.innerHTML.replace(
        /<script[\s\S\n]*<\/script>/,
        ""
      ),
      head: document.head.innerHTML,
    };
  });

  fs.writeFile(
    "test/twittermock/mockpages/twitter-notifications.html",
    `<html><head></head><body>${result.bodyWithouScript}</body></html>`,
    (err) => {
      if (err) console.error(err);
    }
  );

  await browser.close();
})();
