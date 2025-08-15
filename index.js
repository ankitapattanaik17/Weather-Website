const apiKey = "41967e141812641f0810591c184a6079";
const cities = ["Delhi", "Mumbai", "Chennai", "Bhubaneswar", "Ranchi", "Dhenkanal"];

// Show/hide instructions
const howToBtn = document.getElementById("howToUseBtn");
const instructions = document.getElementById("instructions");

howToBtn.addEventListener("click", () => {
    if (instructions.style.display === "none" || !instructions.style.display) {
        instructions.style.display = "block";
        howToBtn.innerText = "Hide Instructions";
    } else {
        instructions.style.display = "none";
        howToBtn.innerText = "How to Use?";
    }
});

// Fetch weather for a single city (input)
async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");

        const data = await response.json();

        // Update main weather cards
        document.getElementById("cityHeading").innerText = `Weather of ${data.name}`;
        document.getElementById("temp").innerText = `${data.main.temp}°C`;
        document.getElementById("weather").innerText = data.weather[0].description;
        document.getElementById("Humidity").innerText = `${data.main.humidity}%`;
        document.getElementById("Wind_Speed").innerText = `${data.wind.speed} m/s`;
        document.getElementById("cloud").innerText = `${data.clouds.all}%`;
        document.getElementById("feels_like").innerText = `${data.main.feels_like}°C`;
        document.getElementById("Mintemp").innerText = `${data.main.temp_min}°C`;
        document.getElementById("Maxtemp").innerText = `${data.main.temp_max}°C`;
        document.getElementById("sunrise").innerText =
            new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-IN", { hour12: true });
        document.getElementById("sunset").innerText =
            new Date(data.sys.sunset * 1000).toLocaleTimeString("en-IN", { hour12: true });

        // Fade-in effect for weather container
        const weatherContainer = document.querySelector(".weather-container");
        if (weatherContainer) weatherContainer.classList.add("show");

    } catch (error) {
        console.error("Error fetching weather:", error);
        alert("City not found or API error!");
    }
}

// Enter key triggers search
document.getElementById("cityInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") getWeather();
});

// Fetch weather for multiple cities (table)
async function fetchCityWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        document.getElementById(`${city}-temp`).textContent = data.main.temp + "°C";
        document.getElementById(`${city}-weather`).textContent = data.weather[0].main;
        document.getElementById(`${city}-humidity`).textContent = data.main.humidity + "%";
        document.getElementById(`${city}-wind`).textContent = data.wind.speed + " m/s";
        document.getElementById(`${city}-sunrise`).textContent =
            new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
        document.getElementById(`${city}-sunset`).textContent =
            new Date(data.sys.sunset * 1000).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });

    } catch (error) {
        console.error(`Error fetching weather for ${city}:`, error);
    }
}

// Update all cities in table
function updateAllCities() {
    cities.forEach(fetchCityWeather);
}

// Initial load
updateAllCities();

// Refresh every 5 minutes
setInterval(updateAllCities, 5 * 60 * 1000);

// Attach button click
document.getElementById("checkWeatherBtn").addEventListener("click", getWeather);
