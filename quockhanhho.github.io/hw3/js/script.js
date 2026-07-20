document.querySelector("#weatherForm").addEventListener("submit", getWeather);

async function getWeather(event) {
    event.preventDefault();

    let city = document.querySelector("#cityInput").value.trim();
    let errorMessage = document.querySelector("#errorMessage");
    let weatherInfo = document.querySelector("#weatherInfo");

    errorMessage.textContent = "";
    weatherInfo.style.display = "none";

    if (city.length === 0) {
        errorMessage.textContent = "Please enter a city name.";
        return;
    }

    try {
        let apiKey = "0f74ff3c18d0c35dc8cdd0ef29289c08";
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

        let response = await fetch(url);
        let data = await response.json();

        if (data.cod !== 200) {
            errorMessage.textContent = "City not found. Please try again.";
            return;
        }

        let temperature = data.main.temp;
        let description = data.weather[0].description;
        let humidity = data.main.humidity;
        let windSpeed = data.wind.speed;

        document.querySelector("#cityName").textContent = data.name + ", " + data.sys.country;
        document.querySelector("#temperature").textContent = "Temperature: " + temperature + "°F";
        document.querySelector("#description").textContent = "Condition: " + description;
        document.querySelector("#humidity").textContent = "Humidity: " + humidity + "%";
        document.querySelector("#wind").textContent = "Wind Speed: " + windSpeed + " mph";

        displayTemperatureImage(temperature);

        weatherInfo.style.display = "block";

    } catch (error) {
        errorMessage.textContent = "Unable to retrieve weather data.";
        console.error(error);
    }
}

function displayTemperatureImage(temperature) {
    let image = document.querySelector("#temperatureImage");

    if (temperature < 50) {
        image.src = "img/cold.jpg";
        image.alt = "Cold weather image";
    } else if (temperature < 75) {
        image.src = "img/mild.jpg";
        image.alt = "Mild weather image";
    } else {
        image.src = "img/hot.jpg";
        image.alt = "Hot weather image";
    }
}