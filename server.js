const corsHeaders = require('hapi-cors-headers');
const mongoose = require('mongoose');
const Hapi = require('hapi');
const routes = require('./routes');
const plugins = require('./plugins');
const logger = require('./server/utils/logger');
const { mongoUrl, appPort, jwtSecretKey } = require('./server/seafood/config');



const {
    User,
  } = require('./server/seafood/models');
// const server = new Hapi.Server();

// server.connection({
//     port: process.env.PORT || appPort
//   });

mongoose.connect(mongoUrl, { useNewUrlParser: true });
const db = mongoose.connection;

const server = Hapi.server({
    port: process.env.PORT || appPort,
});


const startServer = async () => {
    try {
        const user = new User();
        
        await server.register(plugins);
        // server.auth.strategy('token', 'jwt', {
        //     key: jwtSecretKey,
        //     validateFunc: (request, decodedToken, callback) => {
        //       if (!decodedToken) {
        //         callback(null, false);
        //       }
      
        //       callback(null, true, decodedToken.userInfo);
        //     },
        //     verifyOptions: { algorithms: ['HS256'] }
        //   });
        // server.ext('onPreResponse', corsHeaders);
        server.ext('onPreHandler', (request, reply) => {
            Object.assign(request.server, {
            //   authentication,
              db,
            //   order,
            //   site,
            //   client,
            //   clientNote,
            //   dronePartner,
            //   planDeploy,
            //   siteActivity,
            //   repair,
            //   siteArea,
            //   siteMap,
            //   siteRepair,
            //   s3Folder,
              user,
            //   s3aws
            });
            return reply.continue;
          });

        //khai báo các route
        server.route(routes);
    }
    catch(error) {
        console.log('this is error', error);
    }
    await server.start();
};

const stopServer = async () => {
    server.stop({ timeout: 10 * 1000 }, () => {
      logger.info('Shutting down server');
      process.exit(0);
    });
  };

module.exports = {
    startServer,
    stopServer
  };