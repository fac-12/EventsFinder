const queries = require('./queries.js');
const autoAdd = require('./autoAdd.js');

const addEvent = (data, response) => {
    
    if (data.url.includes('www.meetup.com')) {
        const urlArr = data.url.split('/');
        if (urlArr[urlArr.length-3] == 'events') {
            autoAdd(urlArr[urlArr.length-2], response);
        } else if (urlArr[urlArr.length-2] == 'events') {
            autoAdd(urlArr[urlArr.length-1], response);
        } else {
            addManualEvent(data, response);
        }
    } else {
        addManualEvent(data, response);
    }
};

const addManualEvent = (data, response) => {
    var host_id = '';
    var venue_id = '';
    
    function checkHost() {
        queries.checkHost(parsedData.host, (err, res) => {
            if (err) {
                response.writeHead(500, {
                    'Content-Type': 'text/plain'
                });
                response.end('Problem with the server');
            } else {
                if (res[0]) {
                    host_id = res[0].id;
                    console.log("host id is " + host_id);
                    checkVenue();
                } else {
                    console.log("add host");
                    queries.addHost(parsedData.host, (err, res) => {
                        if (err) {
                            response.writeHead(500, {
                                'Content-Type': 'text/plain'
                            });
                            response.end('Problem with the server');
                        } else {
                            checkHost();
                        }
                    });
                }
            }
        });
    }

    function checkVenue() {
        queries.checkVenue(parsedData.venuename, (err, res) => {
            if (err) {
                response.writeHead(500, {
                    'Content-Type': 'text/plain'
                });
                response.end('Problem with the server');
            } else {
                if (res[0]) {
                    venue_id = res[0].id;
                    console.log("venue id is " + venue_id);

                } else {
                    console.log("add venue");
                    queries.addVenue([parsedData.venuename, parsedData.venueaddress, parsedData.venuepostcode], (err, res) => {
                        if (err) {
                            response.writeHead(500, {
                                'Content-Type': 'text/plain'
                            });
                            response.end('Problem with the server');
                        } else {
                            checkVenue();
                        }
                    });
                }
            }
        });
    }
    checkHost();
};

module.exports = { addEvent, addManualEvent};