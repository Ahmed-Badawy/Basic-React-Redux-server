import express from "express";

var app = express();
var port = 3000;

app.get("/",(req,res)=>{
    res.render("index");
})

app.use(express.static(path.join(__dirname, '../public')));

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





// TODO: HELLO WORLD
//FIXME: damn you
// fixme: this
//fixme: this
//FIXME: THIS & THAT
//TODO: you must finish this by the end of the day


