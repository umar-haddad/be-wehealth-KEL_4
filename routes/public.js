const authApiV1 = require('../domains/auth/v1/api');
const articlePublicApiV1 = require('../domains/article/v1/api');
const dokterPublicApiV1 = require('../domains/dokter/v1/api');

const setPublicRoutes = (app) => {
  app.use('/api/v1/auth', authApiV1);
  app.use('/api/v1/articles', articlePublicApiV1);
  app.use('/api/v1/dokter', dokterPublicApiV1);
};

module.exports = setPublicRoutes;
