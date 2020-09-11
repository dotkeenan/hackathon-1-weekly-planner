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
var dayScheduleIndex = "";


// dom query for #weekDaysContainer & add event listener
var weekDaysContainer = document.getElementById("weekDaysContainer");
var selectedDayHeading = document.getElementById("selectedDayHeading");
var addEntryBtn = document.getElementById("addEntryBtn");
var modalH1 = document.getElementById("modalH1");

function pageLoad() {
  selectedDayHeading.textContent = "Scheduled Events for Sunday";
  tableBody.textContent = "";
  addTableEntry();
}

pageLoad();

weekDaysContainer.addEventListener("click", getDay);
// define function that stores the event.target (day clicked)
function getDay(event) {
  console.log(event);
  var targetDay = event.target;
  console.log(event.target);
  var targetDayId = targetDay.getAttribute("id");
  console.log(targetDayId);
  var targetDayText = targetDay.textContent;
  console.log(targetDayText);

  var targetDayFirstChildText = targetDay.firstChild.textContent;

  daySelectValue = targetDayId;

  dayName = targetDayId;
  tableBody.textContent = "";

  // console.log('event.target:', targetDay)
  // Exclude clicks that aren't on the actual .dayItem's
  if (event.target.className.indexOf("dayItem") === -1) {
    return;
  } else {
    selectedDayHeading.textContent = "Scheduled Events for " + targetDayFirstChildText;
    // console.log('targetDay textContent:', targetDayText);
    return targetDayText;
  }
  addTableEntry();
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
}

//Function to dynamically create tr and td
function addTableEntry() {
  tableBody.textContent = "";
  createDayScheduleArr();
  for (var i = 0; i < weekDaysData[daySelectValue].length; i++) {
    var tableRow = document.createElement("tr");
    tableRow.setAttribute("data-index", i);

    var tableDataTime = document.createElement("td");
    var tableDataTask = document.createElement("td");
    tableDataTask.classList.add("tableDataTask");
    tableDataTime.textContent = weekDaysData[daySelectValue][i].time;
    tableDataTask.textContent = weekDaysData[daySelectValue][i].description;

    var buttonDiv = document.createElement("div");

    var tableDataUpdateBtn = document.createElement("button");
    tableDataUpdateBtn.innerText = "Update";
    tableDataUpdateBtn.classList.add("updateBtn");
    tableDataUpdateBtn.addEventListener("click", updateModal);

    var tableDataDeleteBtn = document.createElement("button");
    tableDataDeleteBtn.innerText = "Delete";
    tableDataDeleteBtn.classList.add('deleteBtn');
    tableDataDeleteBtn.addEventListener("click", function() {
      deleteModal.classList.remove('hidden');
    });

    var deleteModalYes = document.getElementById('deleteModalYes');
    var deleteModalNo = document.getElementById('deleteModalNo');
    deleteModalYes.addEventListener('click', deleteEntry);
    deleteModalNo.addEventListener('click', function()  {
      deleteModal.classList.add('hidden');
    });

    buttonDiv.append(tableDataUpdateBtn, tableDataDeleteBtn)
    tableDataTask.append(buttonDiv);
    tableRow.append(tableDataTime, tableDataTask);
    tableBody.append(tableRow);
  }
  getDayLength();
}

addEntryBtn.addEventListener("click", function () {
  var updateBtnTarget = event.target;
  console.log(event);
  containerModal.classList.remove("hidden");
  modalH1.textContent = "Add Entry";
  submitButton.removeEventListener("click", updateEntry);
  submitButton.addEventListener("click", getEntryData);
});
// add event listener to button to open the modal

function openModal(event) {
  console.log(event);
  containerModal.classList.remove("hidden");
}


function updateModal(event)  {
  var tempEventTarget = event.target;
  var updateBtnTargetParent = tempEventTarget.parentElement;
  var divElementParent = updateBtnTargetParent.parentElement;
  var rowTempElement = divElementParent.parentElement;
  dayScheduleIndex = rowTempElement.getAttribute('data-index');
  openModal();
  modalH1.textContent = "Update Entry";
  submitButton.removeEventListener("click", getEntryData);
  submitButton.addEventListener("click", updateEntry);

  inputBox.value = weekDaysData[daySelectValue][dayScheduleIndex].description;
  timeSelect.value = weekDaysData[daySelectValue][dayScheduleIndex].time;
  daySelect.value = daySelectValue;
}

function updateEntry() {
  daySelect = document.getElementById("daySelect");
  timeSelect = document.getElementById("timeSelect");
  inputBox = document.getElementById("descriptionSelect");

  daySelectValue = daySelect.options[daySelect.selectedIndex].value;
  timeSelectValue = timeSelect.options[timeSelect.selectedIndex].textContent;
  inputBoxValue = inputBox.value;
  weekDaysData[daySelectValue][dayScheduleIndex].description = inputBoxValue;
  weekDaysData[daySelectValue][dayScheduleIndex].time = timeSelectValue;

  addTableEntry();
  containerModal.classList.add("hidden");

  daySelect.selectedIndex = 0;
  timeSelect.selectedIndex = 0;
  inputBox.value = "";
}


function deleteEntry() {
  weekDaysData[daySelectValue].splice(dayScheduleIndex, 1);
  deleteModal.classList.add('hidden');
  addTableEntry();
}


function getDayLength(){
  sundayCount.textContent = weekDaysData["sunday"].length;
  mondayCount.textContent = weekDaysData["monday"].length;
  tuesdayCount.textContent = weekDaysData["tuesday"].length;
  wednesdayCount.textContent = weekDaysData["wednesday"].length;
  thursdayCount.textContent = weekDaysData["thursday"].length;
  fridayCount.textContent = weekDaysData["friday"].length;
  saturdayCount.textContent = weekDaysData["saturday"].length;
}
