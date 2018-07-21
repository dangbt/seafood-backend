const Boom = require('boom');

const { userValidation } = require('../../validations');

const postUserRoute = {
  method: 'POST',
  path: '/api/user',
  config: {
    tags: ['api', 'user'],
    description: 'Post user',
    notes: 'Post user',
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
    handler: (req, h) => {
      const userRequest = req.payload;
      const { user } = req.server;
        return user
          .create(userRequest)
          .then((user) => {
            return h.response(user).code(200);
          })
          .catch((err) => {
            return h.response({error : err.message}).code(500);
          });
    }
  }
};

module.exports = postUserRoute;