/**
 * Weather App
 * Provides a multiple different types of weather data and displays
 * it to the user.
 * @Author Husnain Ahmad
 */


// Form elements
const userInput = document.getElementById('user-input');
const searchButton = document.getElementById('submit');
// Different types of infomation elements to be populated
const place = document.getElementById('location');
const pic = document.getElementById('pic');
const time = document.getElementById('time');
const description = document.getElementById('description');
const picture = document.getElementById('picture');
const temp = document.getElementById('temperature');

searchButton.addEventListener('click', searchCity);

/**
 * Takes in the user inputted city and fetches the weather data
 * JSON file. It then calls function to extract data from it.
 * @param {*} event 
 * @returns 
 */
async function searchCity (event) {
  event.preventDefault();
  let input = userInput.value;
  if(input == '')
    return;
  const weatherData = await getWeatherData(input);
  // Validate city user inputs.
  if(weatherData.hasOwnProperty('error')) {
    alert('Input city correctly')
    return;
  }
  extractWeatherData(weatherData);
  userInput.value = '';
}

/**
 * Fills all the result elements with their specific data from the weather
 * JSON file.
 * @param {*} weatherData 
 */
function extractWeatherData(weatherData) {
  // Get the full location of the weather.
  place.innerText = weatherData.location.name + ', ' + weatherData.location.region + ", " + weatherData.location.country;
  // Add the country's flag to its specific div.
  addCountryFlag(weatherData.location.country);
  // Add the time of the specific location.
  time.innerText = weatherData.location.localtime;
  // Add the description describing the weather.
  description.innerText = weatherData.current.condition.text;
  // Add the image describing the weather.
  const imgLink = weatherData.current.condition.icon;
  const imgHtml = `<img id='image-weather' src="${imgLink}" height = 50px; width = 50px;>`
  picture.innerHTML = imgHtml;
  // Add the temperature.
  temp.innerText = weatherData.current.temp_f + ' F°';
}

/**
 * Retrieve weather data from Openweathermap api
 */
 function getWeatherData(city) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'e221e8c538mshddf4ebe4cf161bcp15bdabjsnd1ad917e2dfe',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };
  return fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`, options)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error));
}

/**
 * Retriev and add the country's flag from restcountries.com api.
 * @param {*} country 
 */
function addCountryFlag(country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
	.then(response => response.json())
	.then(data => pic.innerHTML = `<img id='flag' src="${data[0].flags.png}">`)
	.catch(err => console.error(err));
}