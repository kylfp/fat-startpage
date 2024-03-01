// Gather info to fetch appropriate data
// Fetch weather information
// Convert Data Into Useable info


const getLocation = () => {
  const geoLocOptions = {
    enableHighAccuracy: false,
    // timeout: 5000,
  };

  const geoLocSuccess = (pos) => {
    weatherSettings.latitude = pos.coords.latitude
    weatherSettings.longitude = pos.coords.longitude
    // Save pos.coords.long/lat to local storage
    console.log(weatherSettings);
    getWeather(weatherSettings);
  };

  const geoLocFail = (err) => {
    console.warn(`ERROR: ${err.code} - ${err.message}`);
  };

  navigator.geolocation.getCurrentPosition(geoLocSuccess, geoLocFail, geoLocOptions);
};

// const getUtcOff= () => {
//   let date = newDate()
//   return date.getTimezoneOffset() / 8;
// }

const getWeather = async (weatherSettings) => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${weatherSettings.latitude}&longitude=` +
    `${weatherSettings.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,we` +
    'ather_code,wind_speed_10m,wind_direction_10m&daily=temperature_2m_max,temperature_2m_min,su' +
    `nrise,sunset${weatherSettings.tempUnit}${weatherSettings.windUnit}${weatherSettings.precipUnit}&timezone=auto`
  );

  // let weatherData = JSON.parse(JSON.stringify(await response.json()));
  let weatherData = await response.json();
  console.log('Weather Data Found')
  console.log(weatherData);
}

const weatherSettings = {
  latitude: 0,
  longitude: 0,
  tempUnit: '',
  windUnit: '',
  precipUnit: '',
}

getLocation();
console.log(weatherSettings);
