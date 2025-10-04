const apiKey = "J6V5GKM9CFAXHK7H6Z5T858BL";

const input = document.querySelector("input");
let cityName = "";

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    cityName = input.value;
    console.log(cityName);
    input.value = "";

    fetchWeather(cityName)
      .then((response) => {
        console.log(response.city);
        console.log(response.description);
        console.log(response.temperature);
        console.log(response.feelsLike);
        console.log(response.windSpeed);
        console.log(response.humidity);
      })
      .catch((error) => {
        console.log(error);
        return;
      });
  }
});

const fetchWeather = async (cityName) => {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?unitGroup=metric&key=${apiKey}`
  );

  if (response.status === 400) {
    console.log("Invalid city name");
    return;
  }
  const data = await response.json();
  const city = data.resolvedAddress;
  const description = data.days[0].description;
  const temperature = data.days[0].temp;
  const feelsLike = data.days[0].feelslike;
  const windSpeed = data.days[0].windspeed;
  const humidity = data.days[0].humidity;

  return {
    city,
    description,
    temperature,
    feelsLike,
    windSpeed,
    humidity,
  };
};
