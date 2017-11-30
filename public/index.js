// Add Event DOM elements
var addEventForm = document.getElementById('add-event-form');
var addEventName = document.getElementById('name');
var addEventDate = document.getElementById('date-picker');
var addEventStartTime = document.getElementById('event-start-time');
var addEventHost = document.getElementById('host-name');
var addEventVenueName = document.getElementById('venue-name');
var addEventVenueAddress = document.getElementById('venue-address');
var addEventVenuePostcode = document.getElementById('venue-postcode');
var addEventUrl = document.getElementById('event-url');
var addEventHostList = document.getElementById('add-hosts');

// Search Event DOM elements
var searchEventForm = document.getElementById('search-event-form');
var startDatePicker = document.getElementById('start-date-picker');
var endDatePicker = document.getElementById('end-date-picker');
var searchHosts = document.getElementById('search-host');
var searchHostList = document.getElementById('hosts');

// Other DOM elements
var errorDisplay = document.getElementById('error-display');

// Helper Functions
function request(url, cb, method, body) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var result = JSON.parse(xhr.responseText);
      cb(result);
    }
  };
  xhr.open(method, url, true);
  xhr.send(body);
}

function updateDataList(data,list) {
  while(list.firstChild){
    list.removeChild(list.firstChild);
  }
  data.forEach(function(element){
    var option = document.createElement('option');
    option.value = element.host_name;
    list.appendChild(option);
  });
}

addEventForm.addEventListener('submit', function(e){
    e.preventDefault();
    var url = '/add-event';
    var body = 'name='+addEventName.value+'&date='+addEventDate.value+'&start='+addEventStartTime.value+'&host='+addEventHost.value+'&venuename='+addEventVenueName.value+'&venueaddress='+addEventVenueAddress.value+'&venuepostcode='+addEventVenuePostcode.value+'&url='+addEventUrl.value;
    request(url, addEvent, 'POST', body);
});

function addEvent(response) {

};

function searchEvent(response) {
  console.log(response);

};

searchEventForm.addEventListener('submit', function(e){
    e.preventDefault();
    var url = '/search?' + 'start-date=' + startDatePicker.value + "&search-host=" + searchHosts.value + '&end-date=' + endDatePicker.value;

    request(url, searchEvent, 'GET');
});

function requestHostList() {
  request('/get-hosts',updateHostList,'GET' );
}

function updateHostList(response){
  updateDataList(response, searchHostList);
  updateDataList(response, addEventHostList);
}

requestHostList();
