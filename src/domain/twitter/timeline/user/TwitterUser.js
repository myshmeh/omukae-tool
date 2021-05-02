const TwitterUserID = require("./TwitterUserID");
const TwitterUserIconUrl = require("./TwitterUserIconUrl");
const TwitterUserName = require("./TwitterUserName");
const TwitterUserUrl = require("./TwitterUserUrl");

class TwitterUser {
  #id;
  #userName;
  #iconUrl;
  #userUrl;

  constructor(idString, userNameString, iconUrlString, userUrlString) {
    this.#id = new TwitterUserID(idString);
    this.#userName = new TwitterUserName(userNameString);
    this.#iconUrl = new TwitterUserIconUrl(iconUrlString);
    this.#userUrl = new TwitterUserUrl(userUrlString);
  }

  id() {
    return this.#id;
  }

  iconUrl() {
    return this.#iconUrl;
  }

  userName() {
    return this.#userName;
  }

  userUrl() {
    return this.#userUrl;
  }
}

module.exports = TwitterUser;
