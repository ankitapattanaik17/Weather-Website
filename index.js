const apiKey = "41967e141812641f0810591c184a6079";

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();

        // Log everything in console
        console.log(" City:", data.name);
        console.log(" Temperature:", data.main.temp + "°C");
        console.log(" Weather:", data.weather[0].description);
        console.log(" Humidity:", data.main.humidity + "%");
        console.log(" Wind Speed:", data.wind.speed + " m/s");
         console.log("Cloud %:", data.clouds.all);
       console.log("Feels Like:", data.main.feels_like +"°C");
        console.log("Min Temp:", data.main.temp_min +"°C");
        console.log("Max Temp:", data.main.temp_max +"°C");

console.log(
    "Sunrise:",
    new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-IN", { hour12: true })
);
console.log(
    "Sunset:",
    new Date(data.sys.sunset * 1000).toLocaleTimeString("en-IN", { hour12: true })
);



  document.getElementById("cityHeading").innerText = `Weather of ${data.name}`;
        
        document.getElementById("temp").innerText = ` ${data.main.temp}°C`;
        document.getElementById("weather").innerText = ` ${data.weather[0].description}`;
        document.getElementById("Humidity").innerText = ` ${data.main.humidity}%`;
        document.getElementById("Wind_Speed").innerText = `: ${data.wind.speed} m/s`;
        document.getElementById("cloud").innerText =`${data.clouds.all}`;
        document.getElementById("feels_like").innerText =`${data.main.feels_like}°C`;
        document.getElementById("Mintemp").innerText =`${data.main.temp_min}°C`;
        document.getElementById("Maxtemp").innerText = `${data.main.temp_max}°`
        document.getElementById("sunrise").innerText =
           new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-IN", { hour12: true });

        document.getElementById("sunset").innerText =
           new Date(data.sys.sunset * 1000).toLocaleTimeString("en-IN", { hour12: true });


    } catch (error) {
        console.error("Error fetching weather:", error);
    }
}
document.getElementById("cityInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});
  
        const cities = ["Delhi", "Mumbai", "Chennai", "Bhubaneswar", "Ranchi", "Dhenkanal"];

        function fetchCityWeather(city) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
                .then(response => response.json())
                .then(data => {
                    document.getElementById(`${city}-temp`).textContent = data.main.temp + "°C";
                    document.getElementById(`${city}-weather`).textContent = data.weather[0].main;
                    document.getElementById(`${city}-humidity`).textContent = data.main.humidity + "%";
                    document.getElementById(`${city}-wind`).textContent = data.wind.speed + " m/s";
                    document.getElementById(`${city}-sunrise`).textContent =
                        new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
                    document.getElementById(`${city}-sunset`).textContent =
                        new Date(data.sys.sunset * 1000).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });

                    // Console log for debugging
                    console.log(`City: ${city}`);
                    console.log(`Temp: ${data.main.temp}°C`);
                    console.log(`Weather: ${data.weather[0].main}`);
                    console.log(`Humidity: ${data.main.humidity}%`);
                    console.log(`Wind Speed: ${data.wind.speed} m/s`);
                    console.log(`Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true })}`);
                    console.log(`Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true })}`);
                })
                .catch(error => console.error("Error fetching weather:", error));
        }

        function updateAllCities() {
            cities.forEach(city => fetchCityWeather(city));
        }

        // First load
        updateAllCities();

        // Refresh every 5 minutes
        setInterval(updateAllCities, 5 * 60 * 1000);
        document.getElementById("howToUseBtn").addEventListener("click", function () {
    const instructions = document.getElementById("instructions");
    if (instructions.style.display === "none") {
        instructions.style.display = "block"; // Show
        this.innerText = "Hide Instructions";
    } else {
        instructions.style.display = "none"; // Hide
        this.innerText = "How to Use?";
    }
});

    