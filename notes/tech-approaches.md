# APROACH CANDIDATES

In which way should we develop the omukae app?

# Google Extensions

a google extension to scrape the notification page and list the omukae targets.

## Pros

- no need for the user authentication
- no page navigation between the app and twitter (assumed to be)

## Cons

- possible inflexibility to develop
  - not sure if we can scrape the notification page
  - not sure how far the chrome extension storage api is easy to use

# Local Web App w/ Scraping Script

a nodejs webapp that uses a scraping script to fetch the omukae targets. as this app needs the user credentials to log into twitter, we don't deploy it to the web but let the user use it locally via localhost.

## Pros

- a great flexibility to develop (assumed to be)

## Cons

- requires the user credentials (the user would not want it for the data leakage risk)
- page navigation involved between the app and twitter while doing omukae

# Conclusion

From the user experience perspective, Google Extensions wins. From the development perspective, Local Web App w/ Scraping Script wins.<br>
As UX prevails DX, we will go with Google Extensions at a general direction. <br>
But let's check the feasibility in Google Extensions especially about a scraping capability first to make sure we can do it that way. If too difficult to work on, let's go with Local Web App w/ Scraping Script.

# Query Selectors

### get a notification chunks (only visible part) at https://twitter.com/notifications

```javascript
document.querySelectorAll('article[role="article"]');

// get the actual text of the notification
document
  .querySelectorAll('article[role="article"]')[0]
  .querySelector('div[dir="ltr"] span span span').textContent;

// see if it's a notification about likes
"username and 27 others liked your Tweet".match(/.*liked your Tweet$/);

// see if it's a notification about likes (in case a user liked multiple tweets)
"username liked 4 of your Tweets".match(/.*liked [0-9]+ of your Tweets$/);

// or all together
"username liked 4 of your Tweets".match(/.*liked [0-9a-z\s]*your Tweet(|s)$/);

// see if it's a notification about retweet
"and 5 others Retweeted your Tweet".match(/.*Retweeted your Tweet/);
"Retweeted 2 of your Tweets".match(/.*Retweeted [0-9a-z\s]*your Tweet(|s)$/); // all together
```

### scroll down to the bottom of a page at https://twitter.com/notifications

```javascript
window.scrollTo(0, document.body.scrollHeight);
```

### get a link to a tweet at https://twitter.com/i/timeline

```javascript
document.querySelector(
  'article[role="article"] a[href^="/misumiyui41/status"][dir="auto"]'
);
// or
document.querySelectorAll(
  'article[role="article"] a[href^="/misumiyui41/status"][dir="auto"]'
);

// get the actual url
document.querySelector('article[role="article"] a[href^="/misumiyui41/status"]')
  .href;
```

### get a back button at https://twitter.com/i/timeline

```javascript
document.querySelector('div[aria-label="Back"]');
```

### get a list of @username at https://twitter.com/i/timeline

```javascript
document.querySelectorAll(
  'div[role="button"] a[role="link"] div[dir="ltr"] span'
);

// get the actual text data
document.querySelectorAll(
  'div[role="button"] a[role="link"] div[dir="ltr"] span'
)[0].textContent;
```

### get a list of user cells at https://twitter.com/i/timeline

```javascript
document.querySelectorAll('div[data-testid="UserCell"]');

// get the image url
document.querySelectorAll('div[data-testid="UserCell"]')[0].querySelector("img")
  .src;

// get the link to the account
document
  .querySelectorAll('div[data-testid="UserCell"]')[0]
  .querySelector('a[role="link"]').href;

// get the name of the account
document
  .querySelectorAll('div[data-testid="UserCell"]')[0]
  .querySelector('div[dir="auto"] span span').textContent;

// get whether you follow him/her or not
document
  .querySelectorAll('div[data-testid="UserCell"]')[0]
  .querySelector('div[role="button"]')
  .querySelector("span span").textContent;
```

### login to Twitter

```javascript
// get name input tag
document.querySelector('form input[name="session[username_or_email]"]'); //.value to get the actual value

// get password input tag
document.querySelector('form input[name="session[password]"]');

// get the login button
document.querySelector('div[data-testid="LoginForm_Login_Button"]');
```
