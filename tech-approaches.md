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
