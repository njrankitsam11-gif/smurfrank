const logger = {
  info: (...args) => console.info(...args),
  error: (...args) => console.error(...args),
  log: (...args) => console.log(...args),
  warn: (...args) => console.warn(...args),
};

module.exports = { logger };
