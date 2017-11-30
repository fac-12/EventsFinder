const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const queries = require('./queries.js');

const homeHandler = (request, response) => {
  const filePath = path.join(__dirname, '..', 'public', 'index.html')
  fs.readFile(filePath, function(err, file) {
    if (err) {
      response.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      response.end('Server error');
    }
    response.writeHead(200, {
      'Content-Type': 'text/html'
    });
    response.end(file);
  })
}

const staticFileHandler = (request, response, endpoint) => {
  const extensionType = {
    html: 'text/html',
    css: 'txt/css',
    js: 'application/javascript',
    ico: 'image/x-icon',
    ttf: 'application/x-font-truetype',
    woff: 'application/font-woff',
    woff2: 'application/font-woff'
  }
  const extension = endpoint.split('.')[1].split('?')[0];
  const filePath = path.join(__dirname, '..', endpoint)
  fs.readFile(filePath, function(err, file) {
    if (err && err.code === 'ENOENT') {
      response.writeHead(404, {
        'Content-Type': 'text/plain'
      });
      response.end('404 Not Found');
    } else if (err) {
      response.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      response.end('Server error');
    } else {
      response.writeHead(200, 'Content-Type: ' + extensionType[extension]);
      response.end(file);
    }
  })
}

const searchHandler = (request, response, endpoint) => {
  const url = endpoint.split("?")[1];

  var parsedData = querystring.parse(url);
  if (!parsedData['start-date']) {
    parsedData['start-date'] = '01-01-2000';
  }

  if (!parsedData['end-date']) {
    parsedData['end-date'] = '01-01-2100';
  }
  if (parsedData['search-host']) {
    queries.searchWithHost(parsedData, sendResults);
  } else {
    queries.searchWithoutHost(parsedData, sendResults);
  }

  function sendResults(err, res) {
    if (err) {
      response.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      response.end('Problem with the server');
    } else {
      response.writeHead(200, {
        'Content-Type': 'application/json'
      });
      response.end(JSON.stringify(res));
    }
  }
};

const addEventHandler = (request, response, endpoint) => {
  let formData = '';
  request.on('data', function(data) {
    formData += data;
  });
  request.on('end', function() {
    var parsedData = querystring.parse(formData);
    console.log(parsedData);
    queries.addEvent(parsedData.name, parsedData.date, parsedData.start, parsedData.host, parsedData.venuename, parsedData.venueaddress, parsedData.venuepostcode, parsedData.url, (err, res) => {
      if (err) {
        response.writeHead(500, {
          'Content-Type': 'text/plain'
        });
        response.end('Problem with the server');
      } else {
        response.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        response.end('Submitted event');
      }
    })
  });
};

const getHostsHandler = (request, response, endpoint) => {
  queries.getHosts((err, res) => {
    if (err) {
      response.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      response.end('Problem with the server');
    } else {
      response.writeHead(200, {
        'Content-Type': 'application/json'
      });
      response.end(JSON.stringify(res));
    }
  });
};

module.exports = {
  homeHandler,
  staticFileHandler,
  searchHandler,
  addEventHandler,
  getHostsHandler
};
