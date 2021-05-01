const TwitterUserSet = require("./TwitterUserSet");

class TwitterUsers {
  #values;
  #twitterUserSet;

  constructor(twitterUsersArray) {
    this.#values = twitterUsersArray;
    this.#twitterUserSet = new TwitterUserSet(twitterUsersArray);
  }

  values() {
    return this.#values;
  }

  twitterUserSet() {
    return this.#twitterUserSet;
  }
}
