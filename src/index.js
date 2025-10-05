import "./styles.css";

const apiKey = "J6V5GKM9CFAXHK7H6Z5T858BL";

const input = document.querySelector("input");
const map = L.map("map").setView([20, 0], 2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

const markerDivMap = new Map(); // Track marker -> div

input.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    const city = input.value;
    input.value = "";

    try {
      const weatherData = await fetchWeather(city);
      if (!weatherData) return;

      updateMap(weatherData);
    } catch (error) {
      console.log(error);
    }
  }
});

const fetchWeather = async (cityName) => {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&key=${apiKey}`
  );

  if (response.status === 200) {
    const data = await response.json();
    return {
      city: data.resolvedAddress,
      lat: data.latitude,
      lon: data.longitude,
      description: data.days[0].description,
      temperature: data.days[0].temp,
      feelsLike: data.days[0].feelslike,
      windSpeed: data.days[0].windspeed,
      humidity: data.days[0].humidity,
    };
  }
  return null;
};

function updateMap(data) {
  const marker = L.marker([data.lat, data.lon]).addTo(map);
  marker.bindPopup(data.city).openPopup();

  map.setView([data.lat, data.lon], 4);

  marker.on("click", () => {
    // Toggle div
    if (markerDivMap.has(marker)) {
      const existingDiv = markerDivMap.get(marker);
      if (existingDiv.style.display === "none") {
        existingDiv.style.display = "block";
      } else {
        existingDiv.style.display = "none";
      }
    } else {
      const weatherDiv = createWeatherDiv(data, marker);
      markerDivMap.set(marker, weatherDiv);
    }
  });

  marker.fire("click");
}

function createWeatherDiv(data, marker) {
  const weatherInfo = populateWeatherInfo(data);

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = `<span class="material-symbols-outlined">delete_forever</span>`;
  deleteBtn.classList.add("delete-btn");
  weatherInfo.prepend(deleteBtn);

  const mapContainer = document.getElementById("map");
  mapContainer.appendChild(weatherInfo);

  function positionDiv() {
    const point = map.latLngToContainerPoint([data.lat, data.lon]);
    const divWidth = weatherInfo.offsetWidth;
    const divHeight = weatherInfo.offsetHeight;

    weatherInfo.style.position = "absolute";

    // Position div to the right of the marker, vertically centered
    weatherInfo.style.left = point.x + 20 + "px"; // 10px gap to the right
    weatherInfo.style.top = point.y - divHeight / 2 + "px"; // vertically center
  }

  positionDiv();
  map.on("move zoom", positionDiv);

  deleteBtn.addEventListener("click", () => {
    map.removeLayer(marker);
    weatherInfo.remove();
    markerDivMap.delete(marker);
  });

  return weatherInfo;
}

function populateWeatherInfo(data) {
  const weatherInfo = document.createElement("div");
  weatherInfo.classList.add("weather-info");

  const city = document.createElement("h2");
  city.textContent = data.city;
  weatherInfo.appendChild(city);

  const description = document.createElement("p");
  description.textContent = data.description;
  weatherInfo.appendChild(description);

  const temperature = document.createElement("p");
  temperature.textContent = `Temperature: ${data.temperature}°C`;
  weatherInfo.appendChild(temperature);

  const feelsLike = document.createElement("p");
  feelsLike.textContent = `Feels like: ${data.feelsLike}°C`;
  weatherInfo.appendChild(feelsLike);

  const windSpeed = document.createElement("p");
  windSpeed.textContent = `Wind speed: ${data.windSpeed} m/s`;
  weatherInfo.appendChild(windSpeed);

  const humidity = document.createElement("p");
  humidity.textContent = `Humidity: ${data.humidity}%`;
  weatherInfo.appendChild(humidity);

  return weatherInfo;
}
