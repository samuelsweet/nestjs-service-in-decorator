import dotenv = require('dotenv');

const { parsed } = dotenv.config({
  path: `${process.cwd()}/.env`,
});
process.env = { ...parsed, ...process.env };

export const KEY_PREFIX = `abc`;
export const CACHE_ENABLE = `True`;
