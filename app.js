var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');



var routes = require('./routes/index');
var users = require('./routes/users');
var fs=require('fs');
var https=require('https');


var app = express();

//initial global vars
global.__base   = __dirname;
global.custom_modules=__base+'/modules';
//var logger = require(custom_modules+"/logService");
global.__logService =  require(custom_modules+"/logService");
global.__apps_path = __base + "/apps";
var logger = __logService;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
// app.use('/users', users);


var initErrorHandlers=function(app){

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.render('error/404');
    //todo  render  404  data
  });


  // development error handler
  // will print stacktrace
    if (app.get('env') === 'development') {
      app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error/error',{
          message: err.message,
          error: err
        });
      });
    }

  // production error handler
  // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error/error', {
        message: err.message,
        error: {}
      });
    });

};

var initControls = function (app) {
  logger.enter();

  var options = {
    followLinks: false,
    filters: [custom_modules]
  };

  var walker = require("walk").walk(__apps_path, options);

  walker.on('file', function (root, fileStats, next) {
    var filename = fileStats.name;
    if (filename === "controller.js") {
      logger.debug(root + filename);
      require(root + "/" + filename)(app);
    }
    next();
  }).on('end', function () {
    initErrorHandlers(app);
  });

  return app;
};
initControls(app);

module.exports = app;
