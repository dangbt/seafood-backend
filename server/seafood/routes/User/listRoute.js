const Boom = require('boom');

const { userValidation } = require('../../validations');

const listUserRoute = {
  method: 'GET',
  path: '/api/user',
  config: {
    tags: ['api', 'user'],
    description: 'Get user',
    notes: 'Get user',
    // auth: 'token',
    validate: {
      query: userValidation.getUsersRequestSchema
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          200: {
            description: 'Success',
            schema: userValidation.getUsersResponseSchema
          },
          404: { description: 'Not Found', schema: {} },
          500: { description: 'Internal Error', schema: {} }
        }
      }
    },
    handler: (req, reply) => {
      const filter = req.query;
      const { user } = req.server;
    //   const { role } = req.auth.credentials;
    //   if (role === 'admin') {
        return user
          .list(filter)
          .then((users) => {
            return reply.response(users).code(200);
          })
          .catch((err) => {
            return reply.response(Boom.badRequest(err.message));
          });
    //   }
    //   return reply(Boom.unauthorized());
    }
  }
};

module.exports = listUserRoute;