const {
    PORT,
    ENV,
    ENFORCE_SSL,
    MONGODB_URL,

  } = process.env;

  const config = {
    dev: {
      DB_URL:
        'mongodb://localhost:27017/seafood'
    },
    prod: {
      DB_URL:
        'mongodb://admin:admin1@ds163700.mlab.com:63700/seafood'
    }
  };

  const appEnv = ENV || 'dev';
  const appPort = PORT || '5000';

  const { DB_URL } = config[appEnv];
  const mongoUrl = MONGODB_URL || DB_URL;

  const enforceSSL = ENFORCE_SSL === 'true';
  const jwtSecretKey = 'SeaFood';

  module.exports = {
    appPort,
    appEnv,

    mongoUrl,

    enforceSSL,

    jwtSecretKey
  }