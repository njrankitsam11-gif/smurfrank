const logger = {
  info: (...args) => console.info('[RankVault]', ...args),
  warn: (...args) => console.warn('[RankVault]', ...args),
  error: (...args) => console.error('[RankVault]', ...args),
};

module.exports = { logger };
