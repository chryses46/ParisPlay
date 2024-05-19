require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var eventsRouter = require('./routes/events');
var aboutRouter = require('./routes/about');
var mediaRouter = require('./routes/media');
var privacyRouter = require('./routes/privacy');
var profileRouter = require('./routes/profile');
var app = express();
var { ensureAuthenticated, ensureRole, getIdentity } = require('./authMiddleware');
const { auth } = require('express-openid-connect');
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  routes: {
    login: false,
    logout: false,
  },
};
app.use(auth(config));
app.get('/login', (req, res) =>
  res.oidc.login({
    returnTo: '/profile',
    authorizationParams: {
      redirect_uri: process.env.REDIRECT_URI_LOGIN
    },
  })
);

app.get('/logout', (req, res) =>
  res.oidc.logout({
    returnTo: '/',
    authorizationParams: {
      redirect_uri: process.env.REDIRECT_URI_LOGOUT
    },
  })
);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/events', getIdentity, eventsRouter);
app.use('/about', aboutRouter);
app.use('/media', mediaRouter);
app.use('/privacy', privacyRouter);
app.use('/profile', ensureAuthenticated, profileRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;