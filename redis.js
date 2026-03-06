const IORedis = require("ioredis");

const connection = new IORedis(process.env.REDIS_URL);

module.exports = connection;