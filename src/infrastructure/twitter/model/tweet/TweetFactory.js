const Tweet = require("../../../../domain/twitter/timeline/Tweet");

const fromHTMLElements = (tweetElement, username) => {
  const url = tweetElement.querySelector(`a[href^="/${username}/status"]`).href;
  const text = tweetElement.querySelector('div[dir="auto"][lang]').textContent;
  return new Tweet(url, text, url);
};

module.exports = {
  fromHTMLElements,
};
