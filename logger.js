//middleware function itself
const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().getFullYear();
  console.log(`method: ${method}, url: ${url}, time: ${time}`);
  next();
};

module.exports = logger;
