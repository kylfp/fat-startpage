if (document.getElementById("manualInputBox").value == "yes") {
  let settings = JSON.parse(localStorage.getItem("settings"));
  getWeather(settings.location.latitude, settings.location.longitude);
}
else {
  getLocation();
}

async function getLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
    });
  } else {
    document.getElementById("temp").textContent = "ERROR";
  }
}

async function getWeather(latitude, longitude) {
  const response = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longit" +
    "ude=" + longitude + "&hourly=relativehumidity_2m,apparent_temperature&d" +
    "aily=temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weath" +
    "er=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_un" +
    "it=inch&timezone=America%2FNew_York&forecast_days=1"
  );
  let weatherJSON = await response.json();
  weatherJSON = JSON.stringify(weatherJSON);
  const weatherData = JSON.parse(weatherJSON);

  let time = new Date();
  let weatherDataFixed = {
    temp: weatherData.current_weather.temperature + "°F",
    weatherCode: translateCode(weatherData.current_weather.weathercode)[0],
    feelsLike: weatherData.hourly.apparent_temperature[time.getHours()] + "°F",
    highTemp: weatherData.daily.temperature_2m_max[0] + "°F",
    lowTemp: weatherData.daily.temperature_2m_min[0] + "°F",
    humidity: weatherData.hourly.relativehumidity_2m[time.getHours()] + "%",
    windSpeed: weatherData.current_weather.windspeed + "mph",
    windDirection: translateCompass(weatherData.current_weather.winddirection),
    sunrise: weatherData.daily.sunrise[0],
    sunset: weatherData.daily.sunset[0],
  }

  const weatherImages = document.getElementsByClassName("weatherImage");
  for(let i=0; i< weatherImages.length; i++) {
    weatherImages[i].style.display = "none";
  }

  document.getElementById("temp").textContent = weatherDataFixed.temp;
  document.getElementById(translateCode(weatherData.current_weather.weathercode)[1]).style.display = "block";
  document.getElementById("weatherDescription").textContent = weatherDataFixed.weatherCode;
  document.getElementById("feelsLike").textContent = "Feels Like : " + weatherDataFixed.feelsLike;
  document.getElementById("highLowTemp").textContent = "High/Low: " + weatherDataFixed.highTemp + " / " + weatherDataFixed.lowTemp;
  document.getElementById("humidity").textContent = "Humidity: " + weatherDataFixed.humidity;
  document.getElementById("wind").textContent = "Wind: " + weatherDataFixed.windSpeed + " " + weatherDataFixed.windDirection;
  document.getElementById("sunriseSunset").textContent = "Sunrise/Sunset: " + (weatherDataFixed.sunrise).substr(weatherDataFixed.sunrise.length - 5) + "/" + (weatherDataFixed.sunset).substr(weatherDataFixed.sunset.length - 5);
}


function translateCode(code) {
  let weatherDesc;
  let weatherImage;
  let prefix = "weatherImage-"
  let date = new Date();
  time = date.getHours();
  switch(code) {
    case 0:
      weatherDesc = "Clear Sky";
      if (time > 7 && time < 20) {
          weatherImage = prefix + "clearDay";
      }
      else {
          weatherImage = prefix + "clearNight";
      }
      break;
    case 1:
      weatherDesc = "Mostly Clear";
      if (time > 7 && time < 20) {
          weatherImage = prefix + "partlyCloudy";
      }
      else {
          weatherImage = prefix + "clearNight";
      }
      break;
    case 2:
      weatherDesc = "Partly Cloudy";
      if (time > 7 && time < 20) {
          weatherImage = prefix + "partlyCloudy";
      }
      else {
          weatherImage = prefix + "cloudyNight";
      }
      break;
    case 3:
      weatherDesc = "Overcast";
      if (time > 7 && time < 20) {
          weatherImage = prefix + "overcast";
      }
      else {
          weatherImage = prefix + "cloudyNight";
      }
      break;
    case 45:
      weatherDesc = "Foggy";
      if (time > 7 && time < 20) {
          weatherImage = prefix + "foggyDay";
      }
      else {
          weatherImage = prefix + "foggyNight";
      }
      break;
    case 48:
      weatherDesc = "Rime Fog";
      if (time > 7 && time < 20) {
          weatherImage = prefix + "foggyDay";
      }
      else {
          weatherImage = prefix + "foggyNight";
      }
      break;
    case 51:
      weatherDesc = "Light Drizzle";
      weatherImage = prefix + "drizzle";
      break;
    case 53:
      weatherDesc = "Moderate Drizzle";
      weatherImage = prefix + "drizzle";
      break;
    case 55:
      weatherDesc = "Dense Drizzle";
      weatherImage = prefix + "drizzle";
      break;
    case 56:
      weatherDesc = "Light Freezing Drizzle";
      weatherImage = prefix + "drizzle.svg";
      break;
    case 57:
      weatherDesc = "Dense Freezing Drizzle";
      weatherImage = prefix + "drizzle.svg";
      break;
    case 61:
      weatherDesc = "Slight Rain";
      weatherImage = prefix + "moderateRain";
      break;
    case 63:
      weatherDesc = "Moderate Rain";
      weatherImage = prefix + "moderateRain";
      break;
    case 65:
      weatherDesc = "Heavy Rain";
      weatherImage = prefix + "moderateRain";
      break;
    case 66:
      weatherDesc = "Light Feezing Rain";
      weatherImage = prefix + "moderateRain";
      break;
    case 67:
      weatherDesc = "Heavy Freezing Rain";
      weatherImage = prefix + "moderateRain";
      break;
    case 71:
      weatherDesc = "Slight Snowfall";
      weatherImage = prefix + "snow";
      break;
    case 73:
      weatherDesc = "Moderate Snowfall";
      weatherImage = prefix + "snow";
      break;
    case 75:
      weatherDesc = "Heavy Snowfall";
      weatherImage = prefix + "snow";
      break;
    case 77:
      weatherDesc = "Snow Gains";
      weatherImage = prefix + "snow";
      break;
    case 80:
      weatherDesc = "Slight Rain Showers";
      weatherImage = prefix + "heavyRain";
      break;
    case 81:
      weatherDesc = "Moderate Rain Showers";
      weatherImage = prefix + "heavyRain";
      break;
    case 82:
      weatherDesc = "Violent Rain Showers";
      weatherImage = prefix + "heavyRain";
      break;
    case 85:
      weatherDesc = "Slight Snow Showers";
      weatherImage = prefix + "snow";
      break;
    case 86:
      weatherDesc = "Heavy Snow Showers";
      weatherImage = prefix + "snow";
      break;
    case 95:
      weatherDesc = "Slight Thunderstorms";
      weatherImage = prefix + "thunderstorm";
      break;
    case 96:
      weatherDesc = "Moderate Thunderstorms";
      weatherImage = prefix + "thunderstorm";
      break;
    case 99:
      weatherDesc = "Hail Thunderstroms";
      weatherImage = prefix + "thunderstorm";
      break;
    default:
      weatherDesc = "";
      weatherImage = prefix + "clearDay";
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

