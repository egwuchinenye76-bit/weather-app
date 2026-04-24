async function getWeather() {
  console.log("Button clicked");

  const city = document.getElementById("cityInput").value;
  const apiKey = "YOUR_API_KEY";

  const weatherBox = document.getElementById("weatherResult");
  const loading = document.getElementById("loading");
  const error = document.getElementById("error");

  try {

    loading.classList.remove("hidden");
    error.classList.add("hidden");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    loading.classList.add("hidden");

    if (data.cod === "404") {
      error.classList.remove("hidden");
      return;
    }

    weatherBox.classList.remove("hidden");

    document.querySelector(".city").innerText = data.name;
    document.querySelector(".description").innerText = data.weather[0].description;
    document.querySelector(".temp").innerText = data.main.temp + "°C";
    document.querySelector(".humidity").innerText = data.main.humidity + "%";
    document.querySelector(".wind").innerText = data.wind.speed + " km/h";

    document.querySelector(".icon").src =
      `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    const weatherMain = data.weather[0].main.toLowerCase();

    if (weatherMain.includes("cloud")) {
      document.body.style.background = "linear-gradient(135deg, #6b7280, #374151)";
    } else if (weatherMain.includes("rain")) {
      document.body.style.background = "linear-gradient(135deg, #1e3a8a, #0f172a)";
    } else if (weatherMain.includes("clear")) {
      document.body.style.background = "linear-gradient(135deg, #fbbf24, #f59e0b)";
    } else if (weatherMain.includes("snow")) {
      document.body.style.background = "linear-gradient(135deg, #e0f2fe, #bae6fd)";
    }

    setTimeout(() => {
      weatherBox.classList.add("show");
    }, 50);

  } catch (err) {
    console.log(err);
    loading.classList.add("hidden");
    error.classList.remove("hidden");
  }
}