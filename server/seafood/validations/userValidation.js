const Joi = require('joi');
const { ObjectId } = require('mongoose').Types;
Joi.objectId = require('eko-joi-objectid')(Joi, ObjectId);

const userSchema = Joi.object({
  fullName: Joi.string().trim().required()
    .description('Full name')
    .example('John'),

  username: Joi.string().trim().required()
    .description('User username')
    .example('john@launchdeck.org'),

  password: Joi.string().trim().required()
    .description('User password')
    .example('abcd'),

  role: Joi.string().trim().required()
    .valid('normal', 'admin')
    .description('User role')
    .example('normal'),

  phone: Joi.number().required()
    .description('site assigned')
    .example('10'),

  email: Joi.string().trim().required()
  .description('site assigned')
  .example('10')
});

const getUsersRequestSchema = Joi.object({
  fullName: Joi.string().trim()
    .description('User full name')
    .example('filter by full name')
});

const getUsersResponseSchema = Joi.array().items(userSchema);

module.exports = {
  userSchema,
  getUsersRequestSchema,
  getUsersResponseSchema
};