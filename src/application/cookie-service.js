const fs = require("fs");

const writeCookies = (cookies, username) => {
  fs.writeFile(
    `${process.env.TWITTER_COOKIES_PATH}${username}.json`,
    JSON.stringify(cookies),
    (err) => {
      if (err) throw err;
      console.log("successfully write the twitter session cookies: ", cookies);
    }
  );
};

const getCookies = (username) => {
  const cookiesString = fs.readFileSync(
    `${process.env.TWITTER_COOKIES_PATH}${username}.json`,
    "utf-8"
  );
  return JSON.parse(cookiesString);
};

module.exports = {
  writeCookies,
  getCookies,
};
