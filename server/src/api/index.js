const authenticateJWT = require('../middleware/authMiddleware');

module.exports = (app) => {
  app.use('/users', authenticateJWT, require('./user/user.routes'));
  app.use('/auth', require('./authenticate/authentication.routes'));
}