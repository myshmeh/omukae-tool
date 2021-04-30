const puppeteer = require("puppeteer");
const {getCookies} = require("./applications/cookie-service");
const {saveAsPdf} = require("./applications/screenshot-service");

const username = process.argv[2];

(async () => {
  console.log("reading twitter session cookies..");
  const cookies = getCookies(username);

  process.on("unhandledRejection", (reason, promise) => {
    console.error("unhandled rejection: ", promise, "reason: ", reason);
  });

  console.log("setting up a browser..");

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 1280,
    height: 1024,
    deviceScaleFactor: 1,
  });
  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36no"
  );

  console.log("setting twitter session cookie..");
  await page.setCookie.apply(page, cookies);

  console.log("going to https://twitter.com..");

  await page.goto("https://twitter.com", {
    waitUntil: "networkidle2",
  });

  console.log("taking a pdf..");
  await saveAsPdf(page, "scraped");g

  await browser.close();
})();
