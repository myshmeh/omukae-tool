const sqlite3Handler = require("../sqlite3/Sqlite3Handler");

const registerTwitterUserCheck = async (twitterUser) => {
  await sqlite3Handler.run(`insert into checks(user_id), values(?)`, [
    twitterUser.id().value(),
  ]);
};

const isChecked = async (twitterUser) => {
  const checks = await sqlite3Handler.all(
    `select * from checks where user_id = ?`,
    [twitterUser.id().value()]
  );
  return checks.length > 0;
};

module.exports = {
  registerTwitterUserCheck,
  isChecked,
};
