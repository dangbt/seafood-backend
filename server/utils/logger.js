const bunyan = require('bunyan');

// create a logger instance
const log = bunyan.createLogger({
  name: 'Sea Food',
  level: 'info',
  serializers: bunyan.stdSerializers
});

module.exports = log;