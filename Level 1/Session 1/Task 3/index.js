const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("city-input");

const degreesParagraph = document.getElementById("degrees");
const cityNameParagraph = document.getElementById("city-name");
const descriptionParagraph = document.getElementById("description");
const windSpeedParagraph = document.getElementById("wind-speed");

const weatherInfoDiv = document.getElementById("weather-info");

const weatherDescriptions = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Light rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Freezing rain",
  67: "Heavy freezing rain",
  71: "Light snowfall",
  73: "Moderate snowfall",
  75: "Heavy snowfall",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Severe thunderstorm",
};

searchButton.addEventListener("click", searchCity);

async function searchCity() {
  const cityName = searchInput.value;

  if (!cityName) {
    alert("Please enter a city name");
    return;
  }
  try {
    const LOCATION_API = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`;

    const response = await fetch(LOCATION_API);
    const data = await response.json();
    const result = data.results[0];
    const { latitude, longitude, name } = result;

    cityNameParagraph.innerText = name;

    const WEATHER_API = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    const responseWeather = await fetch(WEATHER_API);
    const dataWeather = await responseWeather.json();
    const { temperature, weathercode, windspeed } = dataWeather.current_weather;

    degreesParagraph.innerText = temperature + "°c";
    descriptionParagraph.innerText = weatherDescriptions[weathercode];
    windSpeedParagraph.innerText = windspeed + " km/h";
    weatherInfoDiv.classList.remove("hidden");
  } catch (e) {
    alert("city not found");
  }
}
