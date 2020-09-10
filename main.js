var weekDaysArray = [
  [
    null,
    "test - very important meeting",
    null,
    null,
    "test - meeting with myself",
    null,
    null,
    "test - meeting with someone else",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ],
  [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]
];

// dom query for #weekDaysContainer & add event listener
var weekDaysContainer = document.getElementById("weekDaysContainer");
var selectedDayHeading = document.getElementById("selectedDayHeading");

weekDaysContainer.addEventListener("click", getDay);
// define function that stores the event.target (day clicked)
function getDay(event) {
  var targetDay = event.target;
  var targetDayId = targetDay.getAttribute('id');
  var targetDayText = targetDay.textContent;
  dayName = targetDayId;
  addTableEntry();
  // console.log('event.target:', targetDay)
  // Exclude clicks that aren't on the actual .dayItem's
  if (event.target.className.indexOf("dayItem") === -1) {
    return
  } else {
    selectedDayHeading.textContent = "Scheduled Events for " + targetDayText;
    // console.log('targetDay textContent:', targetDayText);
    return targetDayText;
  }
}

// Dom queries for modal elements
var daySelect = document.getElementById("daySelect");
var timeSelect = document.getElementById("timeSelect");
var inputBox = document.getElementById("inputBox");
var submitButton = document.getElementById("submitButton");

// Add eventlistener to submitButton.  Define getEntryValues
submitButton.addEventListener('click', getEntryData);
function getEntryData(event)  {
  // Storing the text values of modal input elements
  var daySelectValue = daySelect.options[daySelect.selectedIndex].value;
  var timeSelectValue = timeSelect.options[timeSelect.selectedIndex].textContent;
  var inputBoxValue = inputBox.value;
  // ↓↓ Code for pushing to weekDaysArray and appending to table goes below? ↓↓
  // not sure if this is right
  getDay(event);
}

//Function to dynamically create tr and td
function addTableEntry() {
  var tableBody = document.getElementById('tableBody');
  var tableRow = document.createElement('tr');
  var tableDataTime = document.createElement('td');
  var tableDataTask = document.createElement('td');

  tableDataTime.textContent = dayScheduleArr[dayName].time;
  tableDataTask.textContent = dayScheduleArr[dayName].description;
  tableRow.append(tableDataTime, tableDataTask);
  tableBody.append(tableRow);
}
