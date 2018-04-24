const { args } = require('../common');

module.exports = (req, res, next) => {
  if (args.mode) {
    const date = `[${new Date()}]`;
    const color = '\x1b[36m%s\x1b[0m';
    console.log(`${date} ${color}`, `"${req.method} ${req.url}"`, `"${req.headers['user-agent']}"`);
  } 
  next();
};
