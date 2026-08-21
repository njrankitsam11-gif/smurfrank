const logger = {
  info: (...args) => console.info('[SmurfRank]', ...args),
  warn: (...args) => console.warn('[SmurfRank]', ...args),
  error: (...args) => console.error('[SmurfRank]', ...args),
};

module.exports = { logger };
