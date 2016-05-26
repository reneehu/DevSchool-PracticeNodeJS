// import Node's built-in filepath functions
var path = require('path');

// import Node's built-in filesystem functions
var fs = require('fs');

// HTTP Status Codes
var _200 = 'HTTP/1.1 200 OK';
var _301 = 'HTTP/1.1 301 Moved Permanently';
var _400 = 'HTTP/1.1 400 Bad Request';
var _403 = 'HTTP/1.1 403 Forbidden';
var _404 = 'HTTP/1.1 404 Not Found';

// HTTP Content Types
var _html = 'Content-Type: text/html';
var _css = 'Content-Type: text/css';
var _js = 'Content-Type: application/javascript';

// end of line character
var CRLF = '\r\n';


/* YOUR TASKS (if you choose to accept):

    * Implement the parseRequest function

    * Finish implementing the buildResponse function

*/


// takes an HTTP request as a string, e.g.
//
//      GET /devskool.html HTTP/1.1\nHost: localhost:1100\nConnection: keep-alive\n
//      etc...
//
// returns an array of the first line's arguments, e.g.
//
//      ['GET', '/devskool.html', 'HTTP/1.1']
//
exports.parseRequest = function(data) {

    /* TODO */
    var myData = data.split("\n");
    console.log(myData); 
    var myFinalData = myData[0].split(" ");

    return myFinalData;
};


// return true if requestArguments follow the protocol, else false
exports.checkRequest = function(requestArguments) {

    // if not exactly three arguments
    if (requestArguments.length !== 3) {

        return false;
    }

    // if second argument is not absolute path
    else if (path.isAbsolute(requestArguments[1]) === false) {

        return false;
    }

    // if last argument is not 'HTTP/1.1'
    else if (requestArguments[2] != 'HTTP/1.1\r'){
        
        return false;
    }
    

    // for the sake of this dev school, we're only working with 'GET' requests
    if (requestArguments[0] !== 'GET'){

        return false;
    }
    
    return true;
};


// returns entire response for client in a string
exports.buildResponse = function(requestedResource) {

    // requested resource is an html file
    if (path.extname(requestedResource) === '.html') {

        // build the file with a header and footer
        var htmlString = buildPage(requestedResource);

        // buildPage returns false if the html file doesn't exist
        if (htmlString === false) {

            // return error according to protocol and our error page
            htmlString = buildPage('/404error.html');

            // build response and return
            return _404 + _html + '\r' + htmlString;
        }

        // file found
        else {
    
            // build response and return
            return _200 + CRLF + _html + CRLF + CRLF + htmlString;
        }
    }

    /* TODO */

    // requested resource is a filetype we aren't going to handle
    else {

        return _404;
    }

};


// return a string of html for the header, body, and footer
function buildPage (view) {

    var header = retrieve('./view/html/header.html');

    var body = retrieve('./view/html/' + view);

    // if requested view doesn't exist, return false
    if (body === false) {

        return false;
    }

    var footer = retrieve('./view/html/footer.html');

    return header + body + footer;
}


// read a file into a string, return string
function retrieve(resource) {

    // file doesn't exist
    if (fs.exists(resource) === false) {

        console.log('File doesn\'t exist: ' + resource);
        return false;
    }

    // file exists
    else {
        
        // check if it's readable
        try {
            fs.accessSync(resource, fs.R_OK);
        }

        // not readable
        catch(err)
        {
            console.log(err);
            return false;
        }

        // read file to string and return
        return fs.readFileSync(resource, {encoding: 'utf8'});
    }
}