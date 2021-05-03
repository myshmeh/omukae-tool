const varyNumber = (min, max) => {
  return parseInt(min + (max - min) * Math.random());
};

const testTime = 100;

const long = () => {
  if (process.env.NODE_ENV !== "production") return testTime;
  return varyNumber(7500, 10000);
};

const middle = () => {
  if (process.env.NODE_ENV !== "production") return testTime;
  return varyNumber(2000, 4000);
};

const short = () => {
  if (process.env.NODE_ENV !== "production") return testTime;
  return varyNumber(1000, 3000);
};

module.exports = {
  long,
  middle,
  short,
};
