document.getElementById("getWeather").addEventListener("click", wantGetWeather);

async function wantGetWeather() {
    try {
        const city = document.getElementById("city").value;
        if (!city) {
            alert("Please enter a city name!");
            return;
        }

        const Weath = await fetch(`https://goweather.herokuapp.com/weather/${city}`);
        const weather = await Weath.json();

        displayWeather(weather, city);
    } catch (error) {
        console.log("Error:", error);
        document.getElementById("weather").innerHTML = "<p>Failed to load Weather.</p>";
    }
}

function displayWeather(weather, city) {
    const container = document.getElementById("weather");
    container.innerHTML = "";

    const weatherElement = document.createElement("div");

    const temp = parseInt(weather.temperature);
    if (temp <= 15) {
        document.getElementById("weather").style.backgroundColor = "blue";
    } else if (temp <= 25) {
        document.getElementById("weather").style.backgroundColor = "yellow";
    } else {
        document.getElementById("weather").style.backgroundColor = "red"; 
    }

    let weatherIcon = "";
    switch (weather.description.toLowerCase()) {
        case "sunny":
            weatherIcon = "☀️";
            break;
        case "cloudy":
            weatherIcon = "☁️";
            break;
        case "rainy":
            weatherIcon = "🌧️";
            break;
        case "snowy":
            weatherIcon = "❄️";
            break;
        default:
            weatherIcon = "🌤️"; 
            break;
    }

    weatherElement.className = "weather-info";
    weatherElement.innerHTML = `
        <h1>Weather for ${city}</h1>
        <p>Temperature: ${weather.temperature}</p>
        <p>Icon: ${weatherIcon}</p>
        <p>Wind: ${weather.wind}</p>
        <p>Description: ${weather.description}</p>
    `;
    container.appendChild(weatherElement);
}
