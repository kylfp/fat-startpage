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

  const weatherCodes = {
    0:  ['Clear Sky',              'clearDay',      'clearNight'],
    1:  ['Mostly Clear',           'partlyCloudy',  'clearNight'],
    2:  ['Partly Cloudy',          'partlyCloudy',  'cloudyNight'],
    3:  ['Overcast',               'overcast',      'cloudyNight'],
    45: ['Foggy',                  'foggyDay',      'foggyNight'],
    48: ['Rime Fog',               'FoggyDay',      'foggyNight'],
    51: ['Light Drizzle',          'drizzle'],
    53: ['Moderate Drizzle',       'drizzle'],
    55: ['Dense Drizzle',          'drizzle'],
    56: ['Light Freezing Drizzle', 'drizzle'],
    57: ['Dense Freezing Drizzle', 'drizzle'],
    61: ['Slight Rain',            'moderateRain'],
    63: ['Moderate Rain',          'moderateRain'],
    65: ['Heavy Rain',             'moderateRain'],
    66: ['Light Freezing Rain',    'moderateRain'],
    67: ['Heavy Freezing Rain',    'moderateRain'],
    71: ['Slight Snowfall',        'snow'],
    73: ['Moderate Snowfall',      'snow'],
    75: ['Heavy Snowfall',         'snow'],
    77: ['Snow Gains',             'snow'],
    80: ['Slight Rain Showers',    'heavyRain'],
    81: ['Moderate Rains Showers', 'heavyRain'],
    82: ['Violent Rain Showers',   'heavyRain'],
    85: ['Slight Snow Showers',    'snow'],
    86: ['Heavy Snow Showers',     'snow'],
    95: ['Slight Thunderstorms',   'thunderstorm'],
    96: ['Moderate Thunderstorms', 'thunderstorm'],
    99: ['Hail Thunderstorms',     'thunderstorm'],
  }

  let weatherData = {
    temp: `${weatherJSON.current.temperature_2m}${weatherJSON.current_units.temperature_2m}`,
    apparentTemp: `${weatherJSON.current.apparent_temperature}${weatherJSON.current_units.apparent_temperature}`,
    highTemp: `${weatherJSON.daily.temperature_2m_max[0]}${weatherJSON.daily_units.temperature_2m_max}`,
    minTemp: `${weatherJSON.daily.temperature_2m_min[0]}${weatherJSON.daily_units.temperature_2m_min}`,
    humidity: `${weatherJSON.current.relative_humidity_2m}${weatherJSON.current_units.relative_humidity_2m}`,
    weatherCode: weatherJSON.current.weather_code,
    windSpeed: `${weatherJSON.current.wind_speed_10m}${weatherJSON.current_units.wind_speed_10m}`,
    windDirection: weatherJSON.current.wind_direction_10m,
    sunrise: weatherJSON.daily.sunrise[0].slice(11),
    sunrise: weatherJSON.daily.sunset[0].slice(11),
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

const weatherCodes = {
  0:  ['Clear Sky',              'clearDay',      'clearNight'],
  1:  ['Mostly Clear',           'partlyCloudy',  'clearNight'],
  2:  ['Partly Cloudy',          'partlyCloudy',  'cloudyNight'],
  3:  ['Overcast',               'overcast',      'cloudyNight'],
  45: ['Foggy',                  'foggyDay',      'foggyNight'],
  48: ['Rime Fog',               'FoggyDay',      'foggyNight'],
  51: ['Light Drizzle',          'drizzle'],
  53: ['Moderate Drizzle',       'drizzle'],
  55: ['Dense Drizzle',          'drizzle'],
  56: ['Light Freezing Drizzle', 'drizzle'],
  57: ['Dense Freezing Drizzle', 'drizzle'],
  61: ['Slight Rain',            'moderateRain'],
  63: ['Moderate Rain',          'moderateRain'],
  65: ['Heavy Rain',             'moderateRain'],
  66: ['Light Freezing Rain',    'moderateRain'],
  67: ['Heavy Freezing Rain',    'moderateRain'],
  71: ['Slight Snowfall',        'snow'],
  73: ['Moderate Snowfall',      'snow'],
  75: ['Heavy Snowfall',         'snow'],
  77: ['Snow Gains',             'snow'],
  80: ['Slight Rain Showers',    'heavyRain'],
  81: ['Moderate Rains Showers', 'heavyRain'],
  82: ['Violent Rain Showers',   'heavyRain'],
  85: ['Slight Snow Showers',    'snow'],
  86: ['Heavy Snow Showers',     'snow'],
  95: ['Slight Thunderstorms',   'thunderstorm'],
  96: ['Moderate Thunderstorms', 'thunderstorm'],
  99: ['Hail Thunderstorms',     'thunderstorm'],
}
