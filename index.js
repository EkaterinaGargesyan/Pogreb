#!/usr/bin/env node

var express = require("express");
var http = require("http");
const bodyParser = require("body-parser");
var sendOrder = require("./controllers/sendOrder");
var mailText = require("./controllers/mailText");

var app = express();

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

/**
 * Handler for creating new order event
 */

app.use("/neworder", (req, res, next) => {
  sendOrder.letterSend (mailText.text(req.body.nameForm, req.body.nameUser, req.body.phoneUser, req.body.utmParams));
  console.log(req.body);
  res.send("Succes!");
});

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

  var bind = typeof port === "string"
      ? "Pipe " + port
      : "Port " + port;

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

function onListening(){
  console.log(`Listening port ${port}`);
}
