import express from "express";
import path from "path";
import logger from "morgan";
import http from "http";

// import cors from "cors"; //cros: allow cross origin request permissions

import routes from "./routes/index";
import api from "./api/index";

// change this to something else if port 3000 is in use
var port = 3000;

var app = express();

// app.use(cors());//cros: allow cross origin request permissions


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../build')));

app.use('/api', api);
app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});


var server = http.createServer(app);
server.listen(port);
server.on('listening', function() { console.log('listening on port ' + port); })
server.on('error', function(error) {
  switch (error.code) {
    case 'EACCES':
      console.error('Port ' + port + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error('Port ' + port + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});


export default app;
