import express from "express";
import path from "path";
import http from "http";

// import cors from "cors"; //cros: allow cross origin request permissions

import routes from "./routes/index";
import api from "./api/index";

// change this to something else if port 3000 is in use
var port = 3000;
var app = express();
// app.use(cors());//cros: allow cross origin request permissions


// Setting up the view engine:-
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Setting up the node logger:-
import logger from "morgan";
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', api);
app.use('/', routes);


// Setting up MongoDB:-
import mongooseImp from "./mongoose/mongooseImp";
routes.get('/testMongoose/:id', function(req, res, next) {
  if(req.params.id=="populate_people") res.send(mongooseImp.populate_people());
  if(req.params.id=="find") mongooseImp.find().then( result=>res.send(result) );
  if(req.params.id=="update") mongooseImp.update().then( result=>res.send(result) );
  if(req.params.id=="validate") mongooseImp.validate().then( result=>res.send(result) );
});


/*---------------------------------Setting up GraphQL---------------------------------*/
import GraphQLHTTP from "express-graphql";

import old_schema from "./graphql/old_schema";
app.use('/graphiql-editor',GraphQLHTTP({ schema: old_schema, graphiql:true, pretty:true }));
app.use('/graphql',GraphQLHTTP({ schema: old_schema, pretty:true })); //now you can test it with this url: http://localhost:3000/graphql?query={counter,message}

import schema_mongodb from "./graphql/schema_mongodb";
app.use('/graphiql-editor-mongo',GraphQLHTTP({ schema: schema_mongodb, graphiql:true, pretty:true })); //now you can test it here: http://localhost:3000/graphiql-editor-mongo?query={people{fullName,age,isActive}}

import new_schema from "./graphql/new_schema";
app.use('/graphiql-editor-new',GraphQLHTTP({ schema: new_schema.schema,  rootValue: new_schema.root,  graphiql:true, pretty:true }));
/*------------------------------------------------------------------------------*/




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
