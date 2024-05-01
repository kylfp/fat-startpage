// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  initWeather();
});


document.getElementById('showWeatherSettingsBtn').addEventListener('click', () => {
  weatherSettingsDialog.showModal();
});

// Required Skeleton Methods
function initWeather() {
  if(localStorage.getItem('weatherSettings') === null) {
    console.info('INFO: Default Weather Settings');
    let weatherSettings = {
      locationMethod: 'auto',
      latitude: 0,
      longitude: 0,
      impTempUnit: true,
      impWindSpeedUnit: true,
      impPrecipUnit: true,
    }
    saveWeather(weatherSettings);
  }
  else {
    console.info('INFO: User Weather Settings');
  }
  updateWeather();
}


function saveWeather(weatherSettings) {
  localStorage.setItem('weatherSettings', JSON.stringify(weatherSettings));
  console.info('INFO: Weather Settings Saved');
}


function updateWeather() {
  let weatherJSON = getWeather();
  let formatedWeather = formatWeather(weatherJSON);
  resetWeatherIcons();

  // Change Weather Elements
}


// Helper Methods/Consts
async function getWeather() {
  let weatherSettings =  JSON.parse(localStorage.getItem('weatherSettings'));
  const response = await fetch(
    genApiUrl(weatherSettings.longitude, weatherSettings.latitude, weatherSettings.impTempUnit,
              weatherSettings.impWindSpeedUnit, weatherSettings.impPrecipUnit)
  );
  let weatherJSON = JSON.parse(await response.json());
  return weatherJSON;
}

function formatWeather(weatherJSON) {
  let weatherData = {
    temp: weatherJSON.current_weather.temperature + "°F",
    weatherCode: translateCode(weatherJSON.current_weather.weathercode)[0],
    feelsLike: weatherJSON.hourly.apparent_temperature[time.getHours()] + "°F",
    highTemp: weatherJSON.daily.temperature_2m_max[0] + "°F",
    lowTemp: weatherJSON.daily.temperature_2m_min[0] + "°F",
    humidity: weatherJSON.hourly.relativehumidity_2m[time.getHours()] + "%",
    windSpeed: weatherJSON.current_weather.windspeed + "mph",
    windDirection: translateCompass(weatherJSON.current_weather.winddirection),
    sunrise: weatherJSON.daily.sunrise[0],
    sunset: weatherJSON.daily.sunset[0],
  }
  return weatherData;
}

async function getLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(success, error);
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
    }
    function error() {
      console.error('ERROR: Unable to retieve location');
    }
  }
  else {
    console.error('ERROR: Browser does not support geolocation')
  }
}

function genApiUrl(lat, long, impTemp, impWind, impPrecip) {
  let apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&` +
    `current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10` +
    `m,wind_direction_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset`;

  const tempUnitImperial = '&temperature_unit=fahrenheit';
  const windSpeedUnitImperial = '&wind_speed_unit=mph';
  const precipUnitImperial = '&precipitation_unit=inch';
  const apiUrlEnd = '&timezone=auto'

  apiUrl+= impTemp ? tempUnitImperial : '';
  apiUrl+= impWind ? windSpeedUnitImperial : '';
  apiUrl+= impPrecip ? precipUnitImperial : '';
  apiUrl+=apiUrlEnd;

  return apiUrl;
}

function resetWeatherIcons() {
  const weatherIcons = document.getElementsByClassName('weatherIcon');
  for (let i=0; i<weatherIcons; i++) {
    weatherIcons[i].style.display = 'none';
  }
}
