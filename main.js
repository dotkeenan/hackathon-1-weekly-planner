var weekDaysData = {
  sunday: [
    {
      time: "10:00",
      description: "some plan",
    },
    {
      time: "20:00",
      description: "another meeting",
    },
  ],

  monday: [
    {
      time: "18:00",
      description: "very important meeting",
    },
    {
      time: "22:00",
      description: "the task",
    },
  ],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  saturday: [],
};

var tableBody = document.getElementById("tableBody");
var containerModal = document.querySelector(".containerModal");
var inputBox = "";
var daySelect = "";
var timeSelect = "";
var daySelectValue = "sunday";
var timeSelectValue = "";
var inputBoxValue = "";
var dayName = "sunday";
var dayScheduleArr = [];
var dayScheduleIndex = 0;

// dom query for #weekDaysContainer & add event listener
var weekDaysContainer = document.getElementById("weekDaysContainer");
var selectedDayHeading = document.getElementById("selectedDayHeading");
var addEntryBtn = document.getElementById("addEntryBtn");
var modalH1 = document.getElementById('modalH1');

weekDaysContainer.addEventListener("click", getDay);
// define function that stores the event.target (day clicked)
function getDay(event) {
  var targetDay = event.target;
  var targetDayId = targetDay.getAttribute("id");
  var targetDayText = targetDay.textContent;
  console.log(targetDayText);

  dayName = targetDayId;
  tableBody.textContent = "";
  addTableEntry();

  // console.log('event.target:', targetDay)
  // Exclude clicks that aren't on the actual .dayItem's
  if (event.target.className.indexOf("dayItem") === -1) {
    return;
  } else {
    selectedDayHeading.textContent = "Scheduled Events for " + targetDayText;
    // console.log('targetDay textContent:', targetDayText);
    return targetDayText;
  }
}

//----------new entry--------

function enterNewData() {
  weekDaysData[daySelectValue].push({
    time: timeSelectValue,
    description: inputBoxValue,
  });
}

//----------getting data from week array to display on table------

function createDayScheduleArr() {
  dayScheduleArr = [];
  for (var i = 0; i < weekDaysData[dayName].length; i++) {
    dayScheduleArr.push(weekDaysData[dayName][i]);
  }
}

// Add eventlistener to submitButton.  Define getEntryValues
submitButton.addEventListener("click", getEntryData);
function getEntryData(event) {
  // Dom queries for modal elements
  daySelect = document.getElementById("daySelect");
  timeSelect = document.getElementById("timeSelect");
  inputBox = document.getElementById("descriptionSelect");
  var submitButton = document.getElementById("submitButton");

  // Storing the text values of modal input elements
  daySelectValue = daySelect.options[daySelect.selectedIndex].value;
  timeSelectValue = timeSelect.options[timeSelect.selectedIndex].textContent;
  inputBoxValue = inputBox.value;
  enterNewData();
  addTableEntry();
  //------- resetting values and hiding modal

  containerModal.classList.add("hidden");
  daySelect.selectedIndex = 0;
  timeSelect.selectedIndex = 0;
  inputBox.value = "";

  // ↓↓ Code for pushing to weekDaysData and appending to table goes below? ↓↓
  // not sure if this is right
  // getDay(event);
}

//Function to dynamically create tr and td
function addTableEntry() {
  tableBody.textContent = "";
  createDayScheduleArr();
  for (var i = 0; i < dayScheduleArr.length; i++) {
    var tableRow = document.createElement("tr");
    var tableDataTime = document.createElement("td");
    var tableDataTask = document.createElement("td");
    tableDataTask.classList.add("tableDataTask");
    var tableDataUpdateBtn = document.createElement("button");
    tableDataUpdateBtn.innerText = "Update";
    tableDataUpdateBtn.classList.add("updateBtn");
    tableDataUpdateBtn.addEventListener("click", updateModal);
    tableDataTime.textContent = dayScheduleArr[i].time;
    tableDataTask.textContent = dayScheduleArr[i].description;
    tableDataTask.append(tableDataUpdateBtn);
    tableRow.append(tableDataTime, tableDataTask);
    tableBody.append(tableRow);
  }
}

addEntryBtn.addEventListener("click", openModal);
// add event listener to button to open the modal
function openModal(event) {
  containerModal.classList.remove("hidden");
}


function updateModal()  {
  openModal();
  modalH1.textContent = "Update Entry";
  submitButton.removeEventListener("click", getEntryData)
  submitButton.addEventListener("click", updateEntry);

}

function updateEntry() {
  daySelectValue = daySelect.options[daySelect.selectedIndex].value;
  timeSelectValue = timeSelect.options[timeSelect.selectedIndex].textContent;
  inputBoxValue = inputBox.value;
  weekDaysData[daySelectValue][dayScheduleIndex].description = inputBoxValue;
  weekDaysData[daySelectValue][dayScheduleIndex].time = timeSelectValue;

  addTableEntry();
  containerModal.classList.add("hidden");
}
