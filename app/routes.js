var userService = require('./db/services/userServices');
var eventService = require('./db/services/eventServices');
var helpers = require('./helpers');

module.exports = function (app, express) {

  app.post('/api/users/login', userService.login);
  app.post('/api/users/signup', userService.signup);

  // app.get('user/local', eventService.getLocal);

  app.get('/api/event', eventService.getEvents);
  app.get('/api/event/:eventId', eventService.getOneEvent);
  //user helper for decoding token if route is addEvent
  app.use(helpers.decode);

  app.post('/api/event', eventService.addEvent);

  // handles errors for routes not handled above
  // or could we route to a default page like map view?
  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);
};
