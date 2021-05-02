const http = require("http");
const fs = require("fs");

const loginPage = fs.readFileSync(
  "test/twittermock/mockpages/twitter-login.html"
);
const topPage = fs.readFileSync("test/twittermock/mockpages/twitter-top.html");
const notificationsPage = fs.readFileSync(
  "test/twittermock/mockpages/twitter-notifications.html"
);
const timelinePage = fs.readFileSync(
  "test/twittermock/mockpages/twitter-timeline.html"
);

const hostname = "127.0.0.1";
const port = 8080;

const server = http.createServer((req, res) => {
  console.info(`request ${req.method} ${req.url}`);

  let page = "";
  if (req.url === "/") page = topPage;
  if (req.url === "/notifications") page = notificationsPage;
  if (req.url === "/i/timeline") page = timelinePage;

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html; charset=UTF-8");
  res.write(page);
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
