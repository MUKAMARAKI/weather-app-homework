document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("getWeather");
    const input = document.getElementById("city");
    const weatherDiv = document.getElementById("weather");
  
    async function getWeather() {
      const city = input.value.trim();
      if (!city) {
        alert("Please enter a city!");
        return;
      }
  
      weatherDiv.innerHTML = "<p class='loading'>Loading...</p>";
  
      try {
        const res = await fetch(`https://goweather.herokuapp.com/weather/${encodeURIComponent(city)}`);
        if (!res.ok) throw new Error("City not found");
        const data = await res.json();
        showWeather(data, city);
      } catch (err) {
        weatherDiv.innerHTML = `<p class='error-message'>Error: ${err.message}</p>`;
      }
    }
  
  function showWeather(data, city) {
    const { temperature, wind, description } = data;
    const desc = description.toLowerCase();
  
    const icons = {
      sunny: "☀️",
      cloudy: "☁️",
      rainy: "🌧️",
      snowy: "❄️"
    };
    const icon = icons[desc] || "🌤️";
  
    weatherDiv.className = "weather-info"; 
    if (desc === "sunny") weatherDiv.classList.add("sunny");
    else if (desc.includes("cloud")) weatherDiv.classList.add("cloudy");
    else if (desc === "rainy") weatherDiv.classList.add("rainy");
    else if (desc === "snowy") weatherDiv.classList.add("snowy");
  
    weatherDiv.innerHTML = `
      <h1>Weather in ${city}</h1>
      <div style="font-size:2rem;margin-top:5px;">${icon}</div>
      <p><strong>Temp:</strong> ${temperature}</p>
      <p><strong>Description:</strong> ${description}</p>
      <p><strong>Wind:</strong> ${wind}</p>
    `;
  }
  
    btn.addEventListener("click", getWeather);
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") getWeather();
    });
  });