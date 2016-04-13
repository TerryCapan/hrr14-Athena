var jwt = require('jwt-simple');

module.exports = {
  errorLogger: function (error, req, res, next) {
    // log the error then send it to the next middleware in
    console.error(error.stack);
    next(error);
  },
  errorHandler: function (error, req, res, next) {
    // send error message to client
    // message for gracefull error handling on app
    res.send(500, {error: error.message});
  },

  decode: function (req, res, next) {
    var token = req.headers['x-access-token'];
    var user;

    if (!token) {
      return res.sendStatus(403);
    }

    try {
      user = jwt.decode(token, 'secret');
      req.user = user;
      next();
    } catch (error) {
      return next(error);
    }

  }
};
