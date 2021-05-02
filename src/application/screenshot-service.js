require("dotenv").config();

const saveAsPdf = async (page, filename) => {
  await page.pdf({
    path: `${process.env.SCREENSHOT_PATH}${filename}.pdf`,
    format: "a4",
  });
};

module.exports = {
  saveAsPdf,
};
