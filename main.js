// dom query for #weekDaysContainer & add event listener
var weekDaysContainer = document.getElementById('weekDaysContainer');
weekDaysContainer.addEventListener('click', getDay);
// define function that stores the event.target (day clicked)
function getDay(event) {
  var targetDay = event.target;
  var targetDayText = targetDay.textContent;
  // console.log('event.target:', targetDay)
  // Exclude clicks that aren't on the actual .dayItem's
  if (event.target.className.indexOf('dayItem') === -1) {
    return
  } else {
    // console.log('targetDay textContent:', targetDayText);
    return targetDayText;
  }
}
