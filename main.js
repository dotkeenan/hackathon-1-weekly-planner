var weekDaysArray =

{
  sunday: [
    {
      time: "10:00",
      description: "some plan"
    },
    {
      time: "20:00",
      description: "another meeting"
    }
  ],

  monday: [

  ],
  tuesday: [

  ],
  wednsday: [

  ],
  thursday: [

  ],
  friday: [

  ],
  saturday: [

  ]
}


// dom query for #weekDaysContainer & add event listener
var weekDaysContainer = document.getElementById("weekDaysContainer");
var selectedDayHeading = document.getElementById("selectedDayHeading");

weekDaysContainer.addEventListener("click", getDay);
// define function that stores the event.target (day clicked)
function getDay(event) {
  var targetDay = event.target;
  var targetDayText = targetDay.textContent;

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


//----------new entry--------

function enterNewData() {
  weekDaysArray.daySelectValue.push({
    time: timeSelectValue,
    description: inputBoxValue,
  });
}


//----------getting data from week array to display on table------

var dayName = "sunday";

var dayScheduleArr = [];
for (var i = 0; i < weekDaysArray[dayName].length; i++) {
  dayScheduleArr.push(weekDaysArray[dayName][i]);
}
