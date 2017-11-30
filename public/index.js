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
  console.log(response);
  response.forEach(function (event, index) {
    var targetbox = document.getElementById('event-' + (index + 1));
    var title = targetbox.firstElementChild;
    title.textContent = event.event_name;
    title.setAttribute('href', event.event_url);
    var date = title.nextSibling;
    date.textContent = event.event_date.split('T')[0];
    var time = date.nextSibling;
    time.textContent = event.event_time.split(':')[0] + ':' + event.event_time.split(':')[1];
    var hostname = time.nextSibling;
    hostname.textContent = event.host_name;
    var venuename = hostname.nextSibling;
    venuename.textContent = event.venue_name;
    var address = venuename.nextSibling;
    address.textContent = event.venue_address;
    var postcode = address.nextSibling;
    postcode.textContent = event.venue_postcode;
    targetbox.className = 'eventbox';
  })
};

function hideEvents() {
  var eventboxes = document.getElementsByClassName('eventbox');
  [].forEach.call(eventboxes, function (box) {
    box.className = 'eventbox hidden';
  })
}

/* <article id="event-1" class="eventbox hidden">
<a href="" class="event_name"></a>
<p class="event_date"></p>
<p class="event_time"></p>
<p class="host_name"></p>
<p class="venue_name"></p>
<p class="venue_address"></p>
<p class="venue_postcode"></p>
</article> */
arrowClick.addEventListener('click', function(){
  addEventForm.classList.toggle('hidden');
})
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

requestHostList();