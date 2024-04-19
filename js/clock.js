document.addEventListener('DOMContentLoaded', () => {
  init();
});

function init() {
  // @todo
  if(localStorage.getItem('clock') === null) {
    console.info('INFO: Default Clock Settings')
    clockSettings = {
      time: {
        format: 1,
        apIndicator: true,
        seconds: true,
      },
      date: {
        day: {
          pos: 1,
        },
        month: {
          pos: 2,
          format: 1, // 1=3Dig 2=3DigCap 3=Full 4=FullCap
        },
        year: {
          show: true,
          start: true, // 
          format: 1, // 1=2Dig 2=4Dig
        },
      },
    }
    save(clockSettings);
  }
  else {
    console.info('INFO: User Clock Settings')
  }
  setInterval(showClock, 1000);
  showClock();
}

function formatTime(hour, minute, second, timeSettings) {
  let time;
  if (timeSettings.format == 1) {
    time = `${milTimeConv(hour)}:${minute}`;
    time += timeSettings.apIndicator ? ` ${getAmPm(hour)}` : '';
  }
  else {
    time = `${hour}:${minute}`;
  }
  time += timeSettings.seconds ? `${second}` : '';
  return time;
}

function formatDate (day, month, year, dateSettings) {
  let date;
  date = dateSettings.

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

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

function monthToLetters (month) {
    let monthList = [
        "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT",
        "NOV", "DEC"
    ]
    return monthList[month]
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
