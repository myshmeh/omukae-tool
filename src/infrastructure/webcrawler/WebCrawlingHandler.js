const puppeteer = require("puppeteer");

class WebCrawlingHandler {
  #browser;
  #page;

  async init() {
    this.#browser = await puppeteer.launch();
    this.#page = await this.#browser.newPage();
    await this.#page.setViewport({
      width: 1280,
      height: 1024,
      deviceScaleFactor: 1,
    });
    await this.#page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36no"
    );
  }

  async setCookie(cookie) {
    await this.#page.setCookie.apply(this.#page, cookie);
  }

  async close() {
    await this.#browser.close();
  }

  page() {
    return this.#page;
  }
}

const webCrawlingHandler = new WebCrawlingHandler();

module.exports = webCrawlingHandler;
