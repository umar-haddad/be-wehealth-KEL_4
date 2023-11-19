const userApiV1 = require('../domains/user/v1/api');
const articlePrivateApiV1 = require('../domains/article/v1/apiPrivate');
const jwtValidation = require('../middlewares/jwtValidation');

const setPrivateRoutes = (app) => {
  // set middleware
  app.use(jwtValidation());

  // set routes
  app.use('/api/v1/users', userApiV1);
  app.use('/api/v1/articles', articlePrivateApiV1);
};

module.exports = setPrivateRoutes;
