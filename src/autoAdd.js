const request = require('request');

const autoAdd = (eventId, response) => {
    const options = {
        url: buildUrl,
        method: 'GET'
    };
    request(options, (err, res, body) => {
        if (err) {
            response.writeHead(500, {
                'Content-Type': 'text/plain'
            });
            response.end('Server error');
        } else {
            var outcome = parseResponse(body);
            if (outcome.err || outcome.results.length === 0) {
                response.writeHead(500, {
                    'Content-Type': 'text/plain'
                });
                response.end('Meetup API error. Enter event manually.');
            } else {
                let eventData = {};
                eventData.name = outcome.results[0].name;
                eventData.datetime = outcome.results[0].time;
                eventData.host = outcome.results[0].group.name;
                eventData.venuename = outcome.results[0].venue.name;
                eventData.venueaddress1 = outcome.results[0].venue.address_1;
                eventData.venueaddress2 = outcome.results[0].venue.city;
                eventData.url = outcome.results[0].event_url;
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
}

module.exports = autoAdd;