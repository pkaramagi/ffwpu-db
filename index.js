
const express = require('express');
const app = express();
const bodyParser =  require('body-parser');
var debug = require("debug")("backend:server");
var http = require("http");
require("dotenv").config({ path: ".env" });
const mongoose = require("mongoose");
const routes = require("./routes");
const { handleError, ErrorHandler } = require('./helpers/error.handler');

/**
 * redirect traffic to routes
 */

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use('/',routes);

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || "3100");
app.set("port", port);


/**
 * Create HTTP server.
 */


var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port,() => console.log(`Server running on port ${port}`));
server.on("error", onError);
server.on("listening", onListening);

//mongoose options
const mongooseOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
};

//connect to database
mongoose.connect(process.env.MONGO_URL, mongooseOptions).then(
  () => console.log("Database Connection established!"),
  err => console.log(err)
);


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}


/**
 * Coonection to
 */