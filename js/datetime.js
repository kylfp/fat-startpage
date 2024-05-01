// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  initDateTime();
});

document.getElementById('showDateTimeSettingsBtn').addEventListener('click', () => {
  dateTimeSettingsDialog.showModal();
})

// document.getElementsByClassName('closeDialogBtn').addEventListener('click', () => {
//   dateTimeSettingsDialog.close();
// });

document.getElementById('dateTimeSaveBtn').addEventListener('click', () => {
  line1Input = document.getElementById('dateTimeLine1Input');
  line2Input = document.getElementById('dateTimeLine2Input');
  let dateTimeSettings = {
    line1: line1Input.value,
    line2: line2Input.value,
  }
  saveDateTime(dateTimeSettings);
  line1Input.value = '';
  line2Input.value = '';
})

// Required Skeleton Methods
function initDateTime() {
  if(localStorage.getItem('dateTimeSettings') === null) {
    console.info('INFO: Default Clock Settings')
    let dateTimeSettings = {
      line1: 'HH:mm:ss',
      line2: 'yy-MM-dd',
    }
    saveDateTime(dateTimeSettings);
  }
  else {
    console.info('INFO: User Clock Settings')
  }
  setInterval(showClock, 1000);
  showClock();
}

function saveDateTime(dateTimeSettings) {
  localStorage.setItem('dateTimeSettings', JSON.stringify(dateTimeSettings));
  console.info('INFO: Date/Time Settings Saved');
}

// MIGHT NOT BE NEEDED FOR CLOCK
// function updateDateTime(line1, line2) {
//   console.info('INFO: Date/Time Settings Changed');
//
//   setInterval(showClock, 1000);
//   showClock();
//
// }

function showClock() {
  let dateTimeSettings = JSON.parse(localStorage.getItem('dateTimeSettings'));

  let dateTime = new Date();

  document.getElementById("dateTimeLine1").textContent = formatCustomDate(dateTime, dateTimeSettings.line1);
  document.getElementById("dateTimeLine2").textContent = formatCustomDate(dateTime, dateTimeSettings.line2);
}

// Helper Methods/Consts
function formatCustomDate(date, customFormat) {
  const second = date.getSeconds();
  const minute = date.getMinutes();
  const hour24 = date.getHours();
  const hour12 = milTimeConv(hour24); // USR
  const dnIndicator = getAmPm(hour24); // USR
  const day = date.getDate();
  const dayOfWeek = date.getDay();
  const month = date.getMonth();
  const year = date.getFullYear();

  const formattedDate = customFormat
    .replace('ss', second.toString().padStart(2, '0'))
    .replace('s', second)
    .replace('mm', minute.toString().padStart(2, '0'))
    .replace('m', minute)
    .replace('hhh', dnIndicator)
    .replace('hh', hour12.toString().padStart(2, '0'))
    .replace('h', hour12)
    .replace('HH', hour24.toString().padStart(2, '0'))
    .replace('H', hour24)
    .replace('dddd', dayOfWeek)
    .replace('ddd', dayOfWeek)
    .replace('dd', day)
    .replace('d', day)
    .replace('MMMM', numToMonthFull(month))
    .replace('MMM', numToMonth3(month))
    .replace('MM', (month + 1).toString().padStart(2, '0'))
    .replace('M', month + 1)
    .replace('yy', year)
    .replace('y', year.toString().slice(2))

  return formattedDate
}

function numToMonth3(month) {
  let monthList = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
  ]
  return monthList[month];
}

function numToMonthFull(month) {
  let monthList = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ]
  return monthList[month];
}

function numToWeek3(dayOfWeek) {
  let weekList = [ 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT' ]
  return weekList[dayOfWeek];
}

function numToWeekFull(dayOfWeek) {
  let weekList = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ]
  return weekList[dayOfWeek];
}

function milTimeConv(hour) {
  if(~~((hour - 1)/12) == 0) {
    return hour - 12;
  }
  else {
    return hour;
  }
}

function getAmPm(hour) {
  if(~~(hour/12) == 0) {
    return 'AM';
  }
  else {
    return 'PM';
  }
}

// Date Time Format
//d (day of month), dd (day of month leading 0), ddd (day of weak 3 let), dddd (day of week full)
//M (month digit), MM (month digit leading 0), MMM (month 3 let), MMMM (month full)
//y (year 2 digit), yy (year 2 digit leading 0), yyy (year 3 digit), yyyy (year 4 digit)
//h (12 hour no lead 0), H (24 hour no lead 0), hh (12 hour lead 0), HH (24 hour lead 0)
//m (monnute no lead 0), mm (minute lead 0)
//s (second no lead 0), ss (second lead 0)
//t (time maker 1 let), tt (time maker 2 let)
//z (time zone designator)
