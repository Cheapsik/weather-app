// Inspired by https://www.youtube.com/watch?v=n4dtwWgRueI&t=26s

const api = {
  key: "3a47e485fde84ed8483e7db5ff43e168",
  baseurl: "https://api.openweathermap.org/data/2.5/",
};

const search = document.querySelector(".search-box");
search.addEventListener("keypress", key);

function key(e) {
  if (e.keyCode == 13) {
    getResults(search.value);
    console.log(search.value);
  }
}


function getResults(query) {
  fetch(`${api.baseurl}weather?q=${query}&units=metric&appid=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(showResults);
    if(query === undefined){
      showResults = "Try something else";
    }
}

function showResults(weather) {
  console.log(weather);
}
function showResults(weather) {
  console.log(weather);
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".temperature");
  temp.innerHTML = `${weather.main.temp.toFixed(1)} °C`;
  let weather_element = document.querySelector(".weather");
  weather_element.innerText = weather.weather[0].main;
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
