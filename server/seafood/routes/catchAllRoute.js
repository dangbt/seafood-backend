const config = require('../config');

const catchAllRoute = {
  method: 'GET',
  path: '/{p*}',
  config: {
    handler: (req, reply) => {
      if (config.enforceSSL && req.headers['x-forwarded-proto'] === 'http') { // Heroku proxy
        const STATUS_CODE = 301;
        return reply().redirect(`https://${req.headers.host}${req.url.path}`).code(STATUS_CODE);
      }

      return reply.continue();
    }
  }
};

module.exports = catchAllRoute;