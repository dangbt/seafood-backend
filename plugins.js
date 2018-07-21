
/**
 * Vendor modules
 */

const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Good = require('good');
const hapiAuthJWT = require('hapi-auth-jwt');

const config = require('./server/seafood/config');
/**
 * Internal modules
 */
const Package = require('./package.json');

const swagger = {
    plugin: HapiSwagger,
     options: {

      // swagger
        documentationPath: '/docs',
        info: {
            title: Package.description,
            version: Package.version
        },
    },
    // tags: [
    //   {
    //     name: 'authentication',
    //     description: 'authentication\'s api'
    //   },
    //   {
    //     name: 'client',
    //     description: 'client\'s api'
    //   },
    //   {
    //     name: 'site',
    //     description: 'site\'s api'
    //   },
    //   {
    //     name: 'plan deploy',
    //     description: 'plan deploy\'s api'
    //   }
    // ],
    // grouping: 'tags',
    // pathPrefixSize: 4,
    // securityDefinitions: {
    //   jwt: {
    //     type: 'apiKey',
    //     name: 'Authorization',
    //     in: 'header'
    //   }
    // }
  
};

/**
 * exports array of plugins with configuration.
 * @type {Array}
 */
const plugins = [
    Inert,
    Vision,
    swagger,
    // hapiAuthJWT
];

if (config.appEnv === 'dev') {
  // add good console for log reporting
  const good = {
    plugin: Good,
    options: {
      reporters: {
        console: [{ module: 'good-console' }, 'stdout']
      }
    }
  };
  plugins.push(good);
}

module.exports = plugins;