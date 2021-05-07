class TweetedDateTime {
    #value;

    constructor(tweetedIsoDateTimeString) {
        this.#value = tweetedIsoDateTimeString;
    }

    value() {
        return this.#value;
    }
}

module.exports = TweetedDateTime;