const puppeteer = require('puppeteer');

require('dotenv').config();

(async () => {
    const browser = await puppeteer.launch({
        headless: true, defaultViewport: {
            width: 1200,
            height: 800,
            deviceScaleFactor: 1,
        }
    });
    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36no');

    await page.goto('https://twitter.com', {
        waitUntil: 'networkidle2',
    });

    await page.evaluate((username, password) => {
        document.querySelector('form input[name="session[username_or_email]"]').value = username;
        document.querySelector('form input[name="session[password]"]').value = password;
    }, process.env.TWITTER_USER_NAME, process.env.TWITTER_USER_PASSWORD)

    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle2' }),
        page.click('div[data-testid="LoginForm_Login_Button"]'),
    ]);

    await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle2' }),
        page.click('a[href="/notifications"]'),
    ]);

    await page.waitForSelector('article[role="article"]');

    const responses = await page.$$eval('article[role="article"]', (notifications) => 
        notifications.map(notification => notification.textContent));

    await page.pdf({ path: 'twitter.pdf', format: 'a4' });

    await browser.close();
})();