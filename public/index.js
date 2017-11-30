var addEventForm = document.getElementById('add-event-form');
var searchEventForm = document.getElementById('search-event-form');
var inputName = document.getElementById('name');
var eventTime = document.getElementById('event-time');
var venueOptions = document.getElementById('venue-options');
var datePicker = document.getElementById('date-picker')
var startDatePicker = document.getElementById('start-date-picker');
var endDatePicker = document.getElementById('end-date-picker');
var errorDisplay = document.getElementById('error-display');
var searchEvent = document.getElementById('search-event');
var datalist = document.getElementById('hosts');


addEventForm.addEventListener('submit', function(e){
    e.preventDefault();
    var url = '/add-event';
    var body = 'name=' + inputName.value + "&date=" + datePicker.value
                 + "&time=" + eventTime.value + "&venue=" + venueOptions.value;
    request(url, addEvent, 'POST', body);
});

function addEvent(response) {

};

function searchEvent(response) {

};

searchEventForm.addEventListener('submit', function(e){
    e.preventDefault();
    var url = '/search?' + 'start-date=' + startDatePicker.value + "&search-host=" + searchEvent.value;
      if (endDatePicker.value) {
        url += '&edate=' + endDatePicker.value;
      }
    request(url, searchEvent, 'GET');
});

function requestHostList() {
  request('/get-hosts',updateHostList,'GET' );

}
function updateHostList(response){
   while(datalist.firstChild){
     datalist.removeChild(datalist.firstChild);
   }
   response.forEach(function(host){
     var option = document.createElement('option');
     option.value = host.name;
     datalist.appendChild(option);
   });

}

requestHostList();

function request(url, cb, method, body) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var result = JSON.parse(xhr.responseText);
        cb(result);
      }
    };
    xhr.open(method, url, true);
    console.log("sending "+body);
    xhr.send(body);
  }
