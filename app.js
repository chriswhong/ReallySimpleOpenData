var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var session = require('express-session')
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

require('./mongoconnect');
var config = require('./config')



var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: 'mysecret', 
                 saveUninitialized: false,
                 resave: true}))
app.use(passport.initialize());
app.use(passport.session());

app.use('/data.json', routes);
//app.use('/users', users);



passport.serializeUser(function(user, done) {
  console.log("serialize " + user);
  done(null, user);
});
 
passport.deserializeUser(function(user, done) {
  console.log("unserialize " + user);
  done(null, user);
});

passport.use(new LocalStrategy(function(username, password, done) {

  process.nextTick(function() {
    //check provided username and password against config

    console.log(password != config.adminUser.password);
    console.log(username != config.adminUser.username);

    if ((password != config.adminUser.password) ||
      username != config.adminUser.username) {
      return done(null, false);
    }

    console.log('about to return successful');
    return done(null,config.adminUser);
  });
}));


app.get('/login', function(req, res) {
  res.sendfile('views/login.html');
});

// app.post('/login',
//   passport.authenticate('local'),
//   function(req, res) {
//     // If this function gets called, authentication was successful.
//     // `req.user` contains the authenticated user.
//     console.log(req.user);
//     res.send('login successful');
//   });


//from http://stackoverflow.com/questions/15711127/express-passport-node-js-error-handling
app.post('/login',
  passport.authenticate('local'), 
  function(req, res) {

    // Generate a JSON response reflecting authentication status
    if (!req.user) {
      return res.send({ success : false, message : 'authentication failed' });
    }
    return res.send({ success : true, message : 'authentication succeeded' });
  });


app.get('/logout', function(req, res) {
  req.logout();
  res.send({ success : true, message : 'user logged out' });
});


/* GET Home Page */
app.get('/loggedin', function(req, res){
  if (!req.user) {
      return res.send({ success : false, message : 'user not logged in' });
    }
    return res.send({ success : true, message : 'user logged in' });
});
 




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});





module.exports = app;
