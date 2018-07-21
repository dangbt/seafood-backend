const config = require('./server/seafood/config');
const server = require('./server');
const logger = require('./server/utils/logger');

const gracefulStopServer = function () {
    // Wait 10 secs for existing connection to close and then exit.
    server.stopServer();
  };

process.on('uncaughtException', (err) => {
    logger.error(err, 'Uncaught exception');
    process.exit(1);
  });

  
process.on('unhandledRejection', (reason, promise) => {
    logger.error({ promise, reason }, 'unhandledRejection');
    process.exit(1);
  });

process.on('SIGINT', gracefulStopServer);
process.on('SIGTERM', gracefulStopServer);

/**
 * Starts the server
 * @returns {promise.<void>}
 */
const startServer = async function () {
    try {
      // add things here before the app starts, like database connection check etc
      await server.startServer();
      logger.info(`server started at port: ${config.appPort}`);
    } catch (error) {
      logger.error(error);
      process.exit(1);
    }
  };
  
  startServer();
  