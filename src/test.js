const puppeteer = require("puppeteer");
const { saveAsPdf } = require("./application/screenshot-service");
const { createHash } = require("crypto");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({
    width: 800,
    height: 600,
    deviceScaleFactor: 1,
  });

  await page.goto("https://nodejs.org/en/", {
    waitUntil: "networkidle2",
  });

  const res = await page.$eval("#home-intro", (homeIntro) => {
    return { html: homeIntro.innerHTML, text: homeIntro.textContent };
  });
  const elementSet = new Set();
  const hash = createHash("sha256");
  hash.update(res.html);
  const digest = hash.digest("base64");
  elementSet.add(digest);
  console.log(res, elementSet);

  await saveAsPdf(page, "nodejs");

  await browser.close();
})();
