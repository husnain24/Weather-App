// /**
//  * Weather App
//  * Author: Husnain Ahmad
//  */

const userInput = document.getElementById('user-input');
const searchButton = document.getElementById('submit');

const place = document.getElementById('location');
const pic = document.getElementById('pic');
const time = document.getElementById('time');
const description = document.getElementById('description');
const picture = document.getElementById('picture');
const temp = document.getElementById('temperature');

searchButton.addEventListener('click', searchCity);


async function searchCity (event) {
  event.preventDefault();
  let input = userInput.value;
  if(input == '')
    return;
  const weatherData = await getWeatherData(input);
  console.log(weatherData);
  // console.log()
  if(weatherData.hasOwnProperty('error')) {
    alert('Input city correctly')
    return;
  }
  extractWeatherData(weatherData);
  userInput.value = '';
}


function extractWeatherData(weatherData) {
  // document.getElementById('weather-results').toggleAttribute('.results')
  place.innerText = weatherData.location.name + ', ' + weatherData.location.region + ", " + weatherData.location.country;
  addCountryFlag(weatherData.location.country);
  // place.innerText = weatherData.location.name + ", " + weatherData.location.country;
  time.innerText = weatherData.location.localtime;
  description.innerText = weatherData.current.condition.text;
  temp.innerText = weatherData.current.temp_f + ' F';

  const imgLink = weatherData.current.condition.icon;
  const imgHtml = `<img id='image-weather' src="${imgLink}" height = 50px; width = 50px;>`
  picture.innerHTML = imgHtml;
}

/**
 * Retrieve weather data from openweathermap
 */
 const getWeatherData = (city) => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'e221e8c538mshddf4ebe4cf161bcp15bdabjsnd1ad917e2dfe',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };
  return fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`, options)
    .then(response => response.json()
      // if(response.ok)
      //   return response.json();
      // else {
      //   alert('Input city correctly')
      // }
    )
    .then(data => data)
    .catch(error => console.log(error));
}

function addCountryFlag(country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
	.then(response => response.json())
	.then(data => pic.innerHTML = `<img id='flag' src="${data[0].flags.png}">`)
	.catch(err => console.error(err));
}

