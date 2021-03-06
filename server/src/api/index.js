const authenticateJWT = require('../middleware/authMiddleware');

module.exports = (app) => {
  app.use('/auth', require('./authenticate/authentication.routes'));
  app.use('/users', authenticateJWT, require('./user/user.routes'));
  app.use('/dashboard', authenticateJWT, require('./dashboard/dashboard.routes'));
  app.use('/categories', authenticateJWT, require('./categories/category.routes'));
  app.use('/courses', authenticateJWT, require('./course/course.routes'));
  app.use('/client', require('./client/client.routes'));
}