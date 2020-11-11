// Inspired by https://www.youtube.com/watch?v=n4dtwWgRueI&t=26s

let city = document.querySelector(".location .city");
let date = document.querySelector(".location .date");
let temp = document.querySelector(".temperature");
let weather_element = document.querySelector(".weather");

const api = {
  key: "3a47e485fde84ed8483e7db5ff43e168",
  baseurl: "https://api.openweathermap.org/data/2.5/",
};

const search = document.querySelector(".search-box");
search.addEventListener("keypress", key);

function key(e) {
  if (e.keyCode == 13) {
    getResults(search.value);
  }
}
function showMe() {
  getResults(search.value);
  console.log(search.value);
}

function getResults(query) {
  fetch(`${api.baseurl}weather?q=${query}&units=metric&appid=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(showResults);
}
function showResults(weather) {
  const City = (city.innerText = `${weather.name}, ${weather.sys.country}`);
  localStorage.setItem("myCity", City, weather.sys.country);

  let now = new Date();
  const Data = date.innerText = dateBuilder(now);
  localStorage.setItem("myDate", Data);

  const Temperature = (temp.innerHTML = `${weather.main.temp.toFixed(1)} °C`);
  localStorage.setItem("myTemperature", Temperature);
  const Weather = (weather_element.innerText = weather.weather[0].main);
  localStorage.setItem("myWeather", Weather);
}

function dateBuilder(d) {
  let months = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

window.onload = function () {
  city.innerText = localStorage.getItem("myCity");
  temp.innerText = localStorage.getItem("myTemperature");
  weather_element.innerText = localStorage.getItem("myWeather");
  date.innerText = localStorage.getItem("myDate");
  
};
