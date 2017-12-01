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
var arrowClick = document.getElementById('arrow');

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
      console.log(xhr.responseText);
      var result = JSON.parse(xhr.responseText);
      cb(result);
    }
  };
  xhr.open(method, url, true);
  xhr.send(body);
}

function updateDataList(data, list) {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  data.forEach(function (element) {
    var option = document.createElement('option');
    option.value = element.host_name;
    list.appendChild(option);
  });
}

addEventForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var url = '/add-event';
  var body = 'name=' + addEventName.value + '&date=' + addEventDate.value + '&start=' + addEventStartTime.value + '&host=' + addEventHost.value + '&venuename=' + addEventVenueName.value + '&venueaddress=' + addEventVenueAddress.value + '&venuepostcode=' + addEventVenuePostcode.value + '&url=' + addEventUrl.value;
  request(url, addEvent, 'POST', body);
});

function addEvent(response) {

};

function searchEvent(response) {
  hideEvents();
  response.forEach(function (event, index) {
    var targetbox = document.getElementById('event-' + (index + 1));
    var title = targetbox.firstElementChild;
    title.textContent = event.event_name;
    title.setAttribute('href', event.event_url);
    var date = title.nextElementSibling;
    date.textContent = new Date(event.event_date.split('T')[0]).toDateString('en-GB');
    var time = date.nextElementSibling;
    time.textContent = event.event_time.split(':')[0] + ':' + event.event_time.split(':')[1];
    var hostname = time.nextElementSibling;
    hostname.textContent = event.host_name;
    var venuename = hostname.nextElementSibling;
    venuename.textContent = event.venue_name;
    var address = venuename.nextElementSibling;
    address.textContent = event.venue_address;
    var postcode = address.nextElementSibling;
    postcode.textContent = event.venue_postcode;
    targetbox.className = 'eventbox';
    var attendance = postcode.nextElementSibling.firstElementChild;
    attendance.textContent = event.count + ' ';
  });
}

function hideEvents() {
  var eventboxes = document.getElementsByClassName('eventbox');
  [].forEach.call(eventboxes, function (box) {
    box.className = 'eventbox hidden';
  });
}

function todayDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  today = yyyy + '-' + mm + '-' + dd;
  startDatePicker.value = today;
}
todayDate();

arrowClick.addEventListener('click', function(){
  addEventForm.classList.toggle('hidden');
});

searchEventForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var url = '/search?' + 'start-date=' + startDatePicker.value + "&search-host=" + searchHosts.value + '&end-date=' + endDatePicker.value;
  request(url, searchEvent, 'GET');
});

function requestHostList() {
  request('/get-hosts', updateHostList, 'GET');
}

function updateHostList(response) {
  updateDataList(response, searchHostList);
  updateDataList(response, addEventHostList);
}

function loadUpcomingEvents() {
  var url = '/search?' + 'start-date=' + new Date(Date.now()).toLocaleDateString('en-US') + "&search-host=" + searchHosts.value + '&end-date=' + endDatePicker.value;
  request(url, searchEvent, 'GET');
}

requestHostList();
loadUpcomingEvents();
