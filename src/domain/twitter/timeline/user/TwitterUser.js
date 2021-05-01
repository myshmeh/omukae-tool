const TwitterUserID = require("./TwitterUserID");
const TwitterUserIconUrl = require("./TwitterUserIconUrl");

class TwitterUser {
  #id;
  #iconUrl;

  constructor(idString, iconUrlString) {
    this.#id = new TwitterUserID(idString);
    this.#iconUrl = new TwitterUserIconUrl(iconUrlString);
  }

  id() {
    return this.#id;
  }

  iconUrl() {
    return this.#iconUrl;
  }
}

module.exports = TwitterUser;
