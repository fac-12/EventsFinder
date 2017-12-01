const request = require('request');
const queries = require('./queries.js');


const manualAdd = (parsedData, response) => {
    if (parsedData.name && parsedData.date && parsedData.start && (parsedData.venuename || parsedData.venueaddress)) {
        queries.addEvent(parsedData.name, parsedData.date, parsedData.start, parsedData.host, parsedData.venuename, parsedData.venueaddress, parsedData.venuepostcode, parsedData.url, (err, res) => {
            if (err) {
                response.writeHead(500, {
                    'Content-Type': 'text/plain'
                });
                response.end({message:'Problem with the server'});
            } else {
                response.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                response.end({message:'Submitted event'});
            }
        });
    } else {
        response.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        response.end({message:'Please provide more information about event.'});
    }
};

const checkMeetup = (data, response) => {
    if (data.url.includes('www.meetup.com')) {
        const urlArr = data.url.split('/');
        if (urlArr[urlArr.length-3] == 'events') {
            autoAdd(urlArr[urlArr.length-2], response);
        } else if (urlArr[urlArr.length-2] == 'events') {
            autoAdd(urlArr[urlArr.length-1], response);
        } else {
            manualAdd(data, response);
        }
    } else {
        manualAdd(data, response);
    }
};

const autoAdd = (id, response) => {
    const options = {
        url: 'https://api.meetup.com/2/events?event_id='+id,
        method: 'GET'
    };
    request(options, (err, res, body) => {
        if (err) {
            response.writeHead(500, {
                'Content-Type': 'text/plain'
            });
            response.end({message:'Problem with the server'});
        } else {
            var outcome = parseResponse(body);
            if (outcome.err || outcome.results.length === 0) {
                response.writeHead(500, {
                    'Content-Type': 'text/plain'
                });
                response.end({message:'Meetup API error. Enter event manually.'});
            } else {
                let eventData = {};
                var datetime = new Date(outcome.results[0].time);
                eventData.name = outcome.results[0].name;
                eventData.date = datetime.toLocaleDateString('en-US');
                eventData.start = datetime.toLocaleTimeString('en-GB');
                eventData.host = outcome.results[0].group.name;
                eventData.venuename = outcome.results[0].venue.name;
                eventData.venueaddress = outcome.results[0].venue.address_1;
                eventData.venuepostcode = outcome.results[0].venue.city;
                eventData.url = outcome.results[0].event_url;
                manualAdd(eventData,response);
            }
        }
    });
};

function parseResponse(response) {
    try {
        return JSON.parse(response);
    } catch (e) {
        return {
            err: "Meetup API error. Enter event manually."
        };
    }
};

module.exports = {checkMeetup, manualAdd, autoAdd};