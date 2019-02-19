const http = require('http');
const url = require('url');
const fs = require('fs');
const qs = require('querystring');

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;

  switch (req.method) {
   case 'GET':
     // request for the home page
     if (req.url === '/') {
       getIndexPage(req, res);

       // request for index.html page
     } else if (req.url === '/index.html') {
       getIndexPage(req, res);

       // request for calendar.html page
     } else if (req.url === '/calendar.html') {
       getCalendar(req, res);

        // request for addCalendar.html page
     } else if (req.url === '/addCalendar.html') {
        getAddCalendar(req, res);

     } // request for getCalendar API
      else if (req.url === '/getCalendar') {
        getCalendarEvents(req, res);

     } else {
         // Otherwise return 404 error
         res.writeHead(404, {'Content-Type': 'text/html'});
         return res.end("404 Not Found");
     }
     break;

   case 'POST':
     // request for postCalendarEntry API
     if (req.url === '/postCalendarEntry') {
       var reqBody = '';
       // server starts receiving the form data
       req.on('data', function (data) {
         reqBody += data;

       });
       // server has received all the form data
       req.on('end', function () {
         // function to add details of a new event to calendar.json file
         addCalendarFunction(req, res, reqBody);
       });
     }
     break;

   default:
       res.writeHead(405, {'Content-Type': 'text/html'});
       return res.end("405 Method not allowed");
       break;
 }

}).listen(9000);

// function to return the index.html page back to the client
function getIndexPage(req, res) {
  fs.readFile('client/index.html', function(err, html) {
    if(err) {
      throw err;
    }
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.write(html);
    res.end();
  });
}

// function to return the calendar.html page back to the client
function getCalendar(req, res) {
  fs.readFile('client/calendar.html', function(err, html) {
    if(err) {
      throw err;
    }
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.write(html);
    res.end();
  });
}

// function to return the addCalendar.html page back to the client
function getAddCalendar(req, res) {
  fs.readFile('client/addCalendar.html', function (err, html) {
    if (err) {
      throw err;
    }
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/html');
    res.write(html);
    res.end();
  });
}

// function to return the list of calendar events
// The function reads calendar.json file and sends the response back to client
// This function is called from the javaScript of calendar.html file present in client folder
function getCalendarEvents(req, res) {
  fs.readFile('calendar.json', function (err, content) {
    if (err) {
      throw err;
    }
    myJsonObj = JSON.parse(content);
    var response = { res: myJsonObj };
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(response));
    res.end();
  });
}
// function to add calendar events to calendar.json file
// In this application, this function is called after submitting the form in addCalendar.html
function addCalendarFunction(req, res, reqBody) {
  newEvent = qs.parse(reqBody);
  fs.readFile('calendar.json', function (err, content) {
    if (err) {
      throw err;
    }
    events = JSON.parse(content);
    events.calendar.push(newEvent);
    fs.writeFile('calendar.json', JSON.stringify(events, null, 2), (err) => {
      if (err) throw err;
      else {
        res.statusCode = 302;
        res.setHeader('Location', '/calendar.html');
        res.end();
      }
    });
  });
}
