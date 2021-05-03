const saveAsPdf = async (page, filename) => {
  await page.pdf({
    path: `${process.env.SCREENSHOT_PATH}/${
      process.env.NODE_ENV === "production" ? "prod" : "dev"
    }/${filename}-${new Date()}.pdf`,
    format: "a4",
  });
};

module.exports = {
  saveAsPdf,
};
