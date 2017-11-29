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


addEventForm.addEventListener('submit', function(e){
    e.preventDefault();
    var url = '/add-event&' + 'name=' + inputName.value + "&date=" + datePicker.value
                 + "&event-time=" + eventTime.value + "&venue-option=" + venueOptions.value;
    request(url, addEvent, 'POST');
})

searchEventForm.addEventListener('submit', function(e){
    e.preventDefault();
    var url = '/search?' + 'start-date=' + startDatePicker.value + "&search-event=" + searchEvent.value;
      if (endDatePicker.value) {
        url += '&edate=' + endDatePicker.value;
      }
    request(url, searchEvent, 'GET');
})

function request(url, cb, method) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var result = JSON.parse(xhr.responseText);
        cb(result);
      }
    };
    xhr.open(method, url, true);
    xhr.send();
  }

