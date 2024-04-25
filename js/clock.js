document.addEventListener('DOMContentLoaded', () => {
  init();
});

function init() {
  // @todo
  if(localStorage.getItem('clock') === null) {
    console.info('INFO: Default Clock Settings')
    clockSettings = {
      time: 'HH:mm:ss',
      date: 'yyyy-MM-dd',
    }
    save(clockSettings);
  }
  else {
    console.info('INFO: User Clock Settings')
  }
  setInterval(showClock, 1000);
  showClock();
}

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
    .replace('ss', second.padStart(2, '0'))
    .replace('s', second)
    .replace('mm', minute.padStart(2, '0'))
    .replace('m', minute)
    .replace('hhh', dnIndicator)
    .replace('hh', hour12.padStart(2, '0'))
    .replace('h', hour12)
    .replace('HH', hour24.padStart(2, '0'))
    .replace('H', hour24)
    .replace('dddd', dayOfWeek)
    .replace('ddd', dayOfWeek)
    .replace('dd', day)
    .replace('d', day)
    .replace('MMMM', numToMonthFull(month))
    .replace('MMM', numToMonth3(month))
    .replace('MM', month.padStart(2, '0'))
    .replace('M', month)
    .replace('yy', year)
    .replace('y', year.slice(2))

  return formattedDate
}

function save(clockSettings) {
  let clockSettings =
  localStorage.setItem('clockSettings', JSON.stringify(clockSettings))
}

function showClock() {
    let time = new Date();
    let hour = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();

    let day = time.getDate();
    let month = time.getMonth();
    let year = "" + time.getFullYear();

    hour = checkTime(hour);
    minute = checkTime(minute);
    second = checkTime(second);
    day = checkTime(day);

    let currentTime = hour + ":" + minute + ":" + second;
    let currentDate = day + "-" + monthToLetters(month) + "-" + year.slice(2);

    document.getElementById("time").textContent = currentTime;
    document.getElementById("date").textContent = currentDate;
}

function numToMonth3(month) {
  let monthList = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT",
    "NOV", "DEC"
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
  let weekList = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
    'Saturday'
  ]
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
