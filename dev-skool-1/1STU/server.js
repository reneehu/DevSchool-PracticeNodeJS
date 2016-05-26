// import Node's built-in networking functions
var net  = require('net');

// import Node's built-in filepath functions
var path = require('path');

// import the functions in our helpers.js file
var helpers = require('./helpers.js');

// server function:
// runs every time a client connects
var server = net.createServer(function(connection) {

        // make communications human-readable
        connection.setEncoding('utf8');

        // when a request comes through
        connection.on('data', function (data){

            // print the request
            console.log(data);

            // parse data for Request-Line (i.e. the first line of an HTTP request)
            var requestLine = helpers.parseRequest(data);

            // if Request-Line does not follow protocol
            if (helpers.checkRequest(requestLine) === false) {

                // print for us and send client a 400 response
                console.log('Not a proper HTTP request. Ending connection.');
                connection.end(_400);
            }

            // Request-Line is legit HTTP
            else if (helpers.checkRequest(requestLine) === true) {

                // easier on the eyes
                var requestedResource = requestLine[1];

                // build response
                var response = helpers.buildResponse(requestedResource);

                // send response and end connection
                connection.end(response);
            }
        });
    }
);

// listen on a port
server.listen('1100');