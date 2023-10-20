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

setInterval(showClock, 1000);
showClock();
