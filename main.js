var weekDaysData = "";

var randomBackgroundUrls = [
  "pics/painted.png",
  "pics/pine-needles.jpg",
  "pics/pumpkin.jpg",
  "pics/grape-looking-flowers.jpg",
  "pics/lavender.jpg",
  "pics/pink-mountain.jpg",
  "pics/snowy-lake.jpg",
];

var tempBackgroundUrls = [];

var tableBody = document.getElementById("tableBody");
var containerModal = document.querySelector(".modalContainer");
var inputBox = "";
var daySelect = "";
var timeSelect = "";
var daySelectValue = "sunday";
var timeSelectValue = "";
var inputBoxValue = "";
var dayName = "sunday";
var dayScheduleArr = [];
var dayScheduleIndex = "";
var currentDayName = "Sunday";

var deleteModalYes = document.getElementById("deleteModalYes");
var deleteModalNo = document.getElementById("deleteModalNo");
var weekDaysContainer = document.getElementById("weekDaysContainer");
var selectedDayHeading = document.getElementById("selectedDayHeading");
var addEntryBtn = document.getElementById("addEntryBtn");
var modalH1 = document.getElementById("modalH1");

var background = document.querySelector(".background");
var sundayCount = document.querySelector("#sundayCount");
var mondayCount = document.querySelector("#mondayCount");
var tuesdayCount = document.querySelector("#tuesdayCount");
var wednesdayCount = document.querySelector("#wednesdayCount");
var thursdayCount = document.querySelector("#thursdayCount");
var fridayCount = document.querySelector("#fridayCount");
var saturdayCount = document.querySelector("#saturdayCount");

submitButton.addEventListener("click", getEntryData);
weekDaysContainer.addEventListener("click", getDay);
deleteModalYes.addEventListener("click", deleteEntry);
deleteModalNo.addEventListener("click", function () {
  deleteModal.classList.add("hidden");
});
addEntryBtn.addEventListener("click", function () {
  var updateBtnTarget = event.target;
  console.log(event);
  containerModal.classList.remove("hidden");
  modalH1.textContent = "Add Entry";
  submitButton.removeEventListener("click", updateEntry);
  submitButton.addEventListener("click", getEntryData);
});

function pageLoad() {
  gettingDataObj();
  addTableEntries();
}
pageLoad();

function getDay(event) {
  if (event.target.className.indexOf("dayItem") === -1) {
    return;
  } else {
    var targetDay = event.target;
    var targetDayId = targetDay.getAttribute("id");
    var targetDayText = targetDay.textContent;
    var targetDayFirstChildText = targetDay.firstChild.textContent;
    console.log(targetDayText);
    daySelectValue = targetDayId;
    dayName = targetDayId;
    selectedDayHeading.textContent =
      "Scheduled Events for " + targetDayFirstChildText;
    addTableEntries();
    setBackgroundImage();
  }
}

//----------new entry--------

function enterNewData() {
  findNewIndex();
  weekDaysData[daySelectValue].splice(newIndex, 0, {
    time: timeSelectValue,
    description: inputBoxValue,
  });

  savingToStorage();
}

// Add eventlistener to submitButton.  Define getEntryValues

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

  currentDayName = daySelect.options[daySelect.selectedIndex].textContent;
  enterNewData();
  console.log(currentDayName);
  addTableEntries();
  console.log(currentDayName);
  //------- resetting values and hiding modal

  containerModal.classList.add("hidden");
  daySelect.selectedIndex = 0;
  timeSelect.selectedIndex = 0;
  inputBox.value = "";
}

//Function to dynamically create tr and td
function addTableEntries() {
  tableBody.textContent = "";
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

    tableDataDeleteBtn.classList.add("deleteBtn");
    tableDataDeleteBtn.addEventListener("click", function () {
      deleteModal.classList.remove("hidden");
    });

    buttonDiv.append(tableDataUpdateBtn, tableDataDeleteBtn);
    tableDataTask.append(buttonDiv);
    tableRow.append(tableDataTime, tableDataTask);
    tableBody.append(tableRow);
  }
  selectedDayHeading.textContent = "Scheduled Events for " + currentDayName;
  getDayLength();
}

// add event listener to button to open the modal

function openModal(event) {
  console.log(event);
  containerModal.classList.remove("hidden");
}

function updateModal(event) {
  var tempEventTarget = event.target;
  var updateBtnTargetParent = tempEventTarget.parentElement;
  var divElementParent = updateBtnTargetParent.parentElement;
  var rowTempElement = divElementParent.parentElement;
  dayScheduleIndex = rowTempElement.getAttribute("data-index");
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

  currentDayName = daySelect.options[daySelect.selectedIndex].textContent;

  if (dayName === daySelectValue) {
    console.log("same");
    weekDaysData[daySelectValue][dayScheduleIndex].description = inputBoxValue;
    weekDaysData[daySelectValue][dayScheduleIndex].time = timeSelectValue;
  } else {
    console.log("not same");
    weekDaysData[dayName].splice(dayScheduleIndex, 1);

    findNewIndex();
    weekDaysData[daySelectValue].splice(newIndex, 0, {
      time: timeSelectValue,
      description: inputBoxValue,
    });
  }

  savingToStorage();

  addTableEntries();

  console.log("table created");
  selectedDayHeading.textContent = "Scheduled Events for " + currentDayName;
  containerModal.classList.add("hidden");
  daySelect.selectedIndex = 0;
  timeSelect.selectedIndex = 0;
  inputBox.value = "";
  console.log("reset value");
  containerModal.classList.add("hidden");
}

function deleteEntry() {
  weekDaysData[daySelectValue].splice(dayScheduleIndex, 1);

  deleteModal.classList.add("hidden");
  savingToStorage();

  addTableEntries();
}

function getDayLength() {
  sundayCount.textContent = weekDaysData["sunday"].length;
  mondayCount.textContent = weekDaysData["monday"].length;
  tuesdayCount.textContent = weekDaysData["tuesday"].length;
  wednesdayCount.textContent = weekDaysData["wednesday"].length;
  thursdayCount.textContent = weekDaysData["thursday"].length;
  fridayCount.textContent = weekDaysData["friday"].length;
  saturdayCount.textContent = weekDaysData["saturday"].length;
}

//--------------sort entries at the time of new entry or update
//--------------before sort check for length of array at selected day, if 0 add without sort

var newIndex = 0;
function findNewIndex() {
  newIndex = 0;
  var tempEntryTime = parseInt(timeSelectValue.slice(0, 2));
  for (var i = 0; i < weekDaysData[daySelectValue].length; ) {
    var tempDataTime = parseInt(weekDaysData[daySelectValue][i].time);

    if (tempEntryTime > tempDataTime) {
      newIndex++;
      i++;
    } else {
      return;
    }
  }
}

//----------- setting and getting data to/from local storage

function savingToStorage() {
  var tempDataObj = weekDaysData;
  var dataString = JSON.stringify(tempDataObj);
  localStorage.setItem("plannerDataObj", dataString);
}

function gettingDataObj() {
  var fromStorage = localStorage.getItem("plannerDataObj");

  if (fromStorage !== null) {
    var tempDataObj = JSON.parse(fromStorage);
    weekDaysData = tempDataObj;
  } else if (fromStorage === null) {
    weekDaysData = {
      sunday: [
        {
          time: "00:00",
          description: "some plan",
        },
        {
          time: "23:00",
          description: "another meeting",
        },
        {
          time: "05:00",
          description: "the meeting",
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
  } else {
    console.log("Data didnt load!");
  }
}
var modalBackground = document.querySelector(".modal");
var deleteModalBackground = document.querySelector(".mo");
//------Function to randomly choose an index of randomBackgroundUrls
function shuffleTempArray() {
  tempBackgroundUrls = randomBackgroundUrls.slice(0);
  for (i = 0; i < randomBackgroundUrls.length; i++) {
    var randomNum = Math.floor(Math.random() * randomBackgroundUrls.length);
    var placeHolder = tempBackgroundUrls[i];
    tempBackgroundUrls[i] = tempBackgroundUrls[randomNum];
    tempBackgroundUrls[randomNum] = placeHolder;
  }
}
shuffleTempArray();
function setBackgroundImage() {
  if (tempBackgroundUrls.length === 0) {
    shuffleTempArray();
    var randomImageUrl = tempBackgroundUrls[0];
    background.style.backgroundImage = "url(" + randomImageUrl + ")";
    modalBackground.style.backgroundImage = "url(" + randomImageUrl + ")";
    tempBackgroundUrls.splice(0, 1);
  } else {
    randomImageUrl = tempBackgroundUrls[0];
    background.style.backgroundImage = "url(" + randomImageUrl + ")";
    modalBackground.style.backgroundImage = "url(" + randomImageUrl + ")";
    deleteModalBackground.style.backgroundImage = "url(" + randomImageUrl + ")";
    console.log(modalBackground);
    console.log(randomImageUrl);
    tempBackgroundUrls.splice(0, 1);
    var coinFlip = Math.floor(Math.random() * 100);
    if (coinFlip % 2 == 0) {
      background.style.filter = "hue-rotate(90deg)";
      coinFlip = Math.floor(Math.random() * 100);
      console.log(coinFlip);
    } else if (coinFlip % 2 != 0) {
      background.style.filter = "hue-rotate(0deg)";
      coinFlip = Math.floor(Math.random() * 100);
      console.log(coinFlip);
    }
  }
}
