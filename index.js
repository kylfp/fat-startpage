// ######################################################################### //
// CLOCK FUNCTION
// ######################################################################### //
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
    console.log(hour);
    console.log(minute);
    console.log(day);
    console.log(monthToLetters(month));
    console.log(year);


    document.getElementById("clock-widget").innerHTML = currentTime;
    document.getElementById("date-widget").innerHTML = currentDate;
}

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

function monthToLetters (month) {
    let monthList = [
        "JAN", "FEB", "MAR", "APRIL", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT",
        "NOV", "DEC"
    ]
    return monthList[month]
}

setInterval(showClock, 1000);
showClock();

// ######################################################################### //
// WEATHER FUNCTION
// ######################################################################### //
async function getWeather() {
    const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=19.9064&longitude=-75"
        + ".2069&hourly=relativehumidity_2m,apparent_temperature&daily=tempera"
        + "ture_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&"
        + "temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=i"
        + "nch&timezone=America%2FNew_York&forecast_days=1"
    );
    let weatherJSON = await response.json();
    weatherJSON = JSON.stringify(weatherJSON);
    const weatherData = JSON.parse(weatherJSON);

    let time = new Date();
    let weatherDataFixed = {
        temp: weatherData.current_weather.temperature + "°F",
        weatherCode: translateCode(weatherData.current_weather.weathercode)[0],
        feelsLike: "Feels like: " + weatherData.hourly.apparent_temperature[time.getHours()] + "°F",
        highTemp: weatherData.daily.temperature_2m_max[0] + "°F",
        lowTemp: weatherData.daily.temperature_2m_min[0] + "°F",
        humidity: weatherData.hourly.relativehumidity_2m[time.getHours()] + "%",
        windSpeed: weatherData.current_weather.windspeed + "mph",
        windDirection: translateCompass(weatherData.current_weather.winddirection),
        sunrise: weatherData.daily.sunrise[0],
        sunset: weatherData.daily.sunset[0],
    }

    document.getElementById("temp").innerHTML = weatherDataFixed.temp;
    document.getElementById("weather-image").src= translateCode(weatherData.current_weather.weathercode)[1];
    document.getElementById("weather-description").innerHTML = weatherDataFixed.weatherCode;
    document.getElementById("feels-like").innerHTML = weatherDataFixed.feelsLike;
    document.getElementById("highlow-temp").innerHTML = weatherDataFixed.highTemp + " / " + weatherDataFixed.lowTemp;
    document.getElementById("humidity").innerHTML = "Humidity: " + weatherDataFixed.humidity;
    document.getElementById("wind").innerHTML = "Wind: " + weatherDataFixed.windSpeed + " " + weatherDataFixed.windDirection;
    document.getElementById("sunrise").innerHTML = "Sunrise: " + (weatherDataFixed.sunrise).substr(weatherDataFixed.sunrise.length - 5);
    document.getElementById("sunset").innerHTML = "Sunset: " + (weatherDataFixed.sunset).substr(weatherDataFixed.sunset.length - 5);
}

getWeather();

function translateCode(code) {
    let weatherDesc;
    let weatherImage;
    let date = new Date();
    time = date.getHours();
    switch(code) {
        case 0:
            weatherDesc = "Clear Sky";
            console.log(time);
            if (time > 7 && time < 20) {
                weatherImage = "weather_icons/clear_day.png";
            }
            else {
                weatherImage = "weather_icons/clear_night.png";
            }
            break;
        case 1:
            weatherDesc = "Mostly Clear";
            if (time > 7 && time < 20) {
                weatherImage = "weather_icons/partly_cloudy.png";
            }
            else {
                weatherImage = "weather_icons/clear_night.png";
            }
            break;
        case 2:
            weatherDesc = "Partly Cloudy";
            if (time > 7 && time < 20) {
                weatherImage = "weather_icons/partly_cloudy.png";
            }
            else {
                weatherImage = "weather_icons/cloudy_night.png";
            }
            break;
        case 3:
            weatherDesc = "Overcast";
            if (time > 7 && time < 20) {
                weatherImage = "weather_icons/overcast.png";
            }
            else {
                weatherImage = "weather_icons/cloudy_night.png";
            }
            break;
        case 45:
            weatherDesc = "Foggy";
            if (time > 7 && time < 20) {
                weatherImage = "weather_icons/foggy_day.png";
            }
            else {
                weatherImage = "weather_icons/foggy_night.png";
            }
            break;
        case 48:
            weatherDesc = "Rime Fog";
            if (time > 7 && time < 20) {
                weatherImage = "weather_icons/foggy_day.png";
            }
            else {
                weatherImage = "weather_icons/foggy_night.png";
            }
            break;
        case 51:
            weatherDesc = "Light Drizzle";
            weatherImage = "weather_icons/drizzle.png";
            break;
        case 53:
            weatherDesc = "Moderate Drizzle";
            weatherImage = "weather_icons/drizzle.png";
            break;
        case 55:
            weatherDesc = "Dense Drizzle";
            weatherImage = "weather_icons/drizzle.png";
            break;
        case 56:
            weatherDesc = "Light Freezing Drizzle";
            weatherImage = "weather_icons/drizzle.png";
            break;
        case 57:
            weatherDesc = "Dense Freezing Drizzle";
            weatherImage = "weather_icons/drizzle.png";
            break;
        case 61:
            weatherDesc = "Slight Rain";
            weatherImage = "weather_icons/moderate_rain.png";
            break;
        case 63:
            weatherDesc = "Moderate Rain";
            weatherImage = "weather_icons/moderate_rain.png";
            break;
        case 65:
            weatherDesc = "Heavy Rain";
            weatherImage = "weather_icons/moderate_rain.png";
            break;
        case 66:
            weatherDesc = "Light Feezing Rain";
            weatherImage = "weather_icons/moderate_rain.png";
            break;
        case 67:
            weatherDesc = "Heavy Freezing Rain";
            weatherImage = "weather_icons/moderate_rain.png";
            break;
        case 71:
            weatherDesc = "Slight Snowfall";
            weatherImage = "weather_icons/snow.png";
            break;
        case 73:
            weatherDesc = "Moderate Snowfall";
            weatherImage = "weather_icons/snow.png";
            break;
        case 75:
            weatherDesc = "Heavy Snowfall";
            weatherImage = "weather_icons/snow.png";
            break;
        case 77:
            weatherDesc = "Snow Gains";
            weatherImage = "weather_icons/snow.png";
            break;
        case 80:
            weatherDesc = "Slight Rain Showers";
            weatherImage = "weather_icons/heavy_rain.png";
            break;
        case 81:
            weatherDesc = "Moderate Rain Showers";
            weatherImage = "weather_icons/heavy_rain.png";
            break;
        case 82:
            weatherDesc = "Violent Rain Showers";
            weatherImage = "weather_icons/heavy_rain.png";
            break;
        case 85:
            weatherDesc = "Slight Snow Showers";
            weatherImage = "weather_icons/snow.png";
            break;
        case 86:
            weatherDesc = "Heavy Snow Showers";
            weatherImage = "weather_icons/snow.png";
            break;
        case 95:
            weatherDesc = "Slight Thunderstorms";
            weatherImage = "weather_icons/thunderstorm.png";
            break;
        case 96:
            weatherDesc = "Moderate Thunderstorms";
            weatherImage = "weather_icons/thunderstorm.png";
            break;
        case 99:
            weatherDesc = "Hail Thunderstroms";
            weatherImage = "weather_icons/thunderstorm.png";
            break;
        default:
            weatherDesc = "";
            weatherImage = "weather_icons/clear_day.png";
    }
    return [weatherDesc, weatherImage];
}

 function translateCompass(degrees) {
    let direction;
    if (degrees < 22.5 || degrees > 337.5) {
        direction = "North"
    }
    else if (degrees > 22.5 && degrees <= 67.5) {
        direction = "Northeast"
    }
    else if (degrees > 67.5 && degrees <= 112.5) {
        direction = "East"
    }
    else if (degrees > 112.5 && degrees <= 157.5) {
        direction = "Southeast"
    }
    else if (degrees > 157.5 && degrees <= 202.5) {
        direction = "South"
    }
    else if (degrees > 202.5 && degrees <= 247.5) {
        direction = "Southwest"
    }
    else if (degrees > 292.5 && degrees <= 337.5) {
        direction = "West"
    }
    else {
        direction = "Northwest"
    }
    return direction;
}
