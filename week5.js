// Goal: Implement a weather application using data from an external API
// - Signup for an api key @ https://weatherapi.com
// - The API takes three inputs (querystring parameters)
//   - key = your API key
//   - q = a location query (e.g. Chicago)
//   - days = number of days of forecast data to return, between 1-3
// - Example: https://api.weatherapi.com/v1/forecast.json?key=YOUR-API-KEY&q=Chicago&days=3
// - The basic recipe (algorithm) is included; write the rest of the recipe in the comments!
// - Lab: Follow the provided recipe and the "mock-up" provided in the hard-coded HTML; respond 
//        to the user filling out the location on the form by fetching the weather API and 
//        displaying the city/state, e.g. if the user enters "chicago" on the form, show "Current
//        Weather for Chicago, Illinois".
// - Homework: Complete the application by accepting a number of days; show the current weather 
//             conditions and forecast based on the number of days entered by the user.

window.addEventListener('DOMContentLoaded', async function() {
  // Get a reference to the "get weather" button
  let getWeatherButton = document.querySelector(`.get-weather`)

  // When the "get weather" button is clicked:
  getWeatherButton.addEventListener(`click`, async function(event) {

    // - Ignore the default behavior of the button
    event.preventDefault()

    // - Get a reference to the element containing the user-entered location and number of days
    let locationInput = document.querySelector(`#location`)
    let numDaysInput = document.querySelector(`#days`)

    // - Get the user-entered location and number of days from the element's value
    let location = locationInput.value
    let numDays = numDaysInput.value

    // - Check to see if the user entered anything; if so:
    if (location.length > 0) {
      // - Construct a URL to call the WeatherAPI.com API
      let url = `https://api.weatherapi.com/v1/forecast.json?key=1ddcb03accb34d72891153938212704&q=${location}&days=${numDays}`

      // - Fetch the url, wait for a response, store the response in memory
      let response = await fetch(url)

      // - Ask for the json-formatted data from the response, wait for the data, store it in memory
      let json = await response.json()

      // - Write the json-formatted data to the JavaScript console
      console.log(json)

      // - Store the returned location, current weather conditions, the forecast as three separate variables
      let interpretedLocation = json.location
      let currentWeather = json.current
      let dailyForecast = json.forecast

      // Store a reference to the "current" element
      let currentElement = document.querySelector(`.current`)

      // Fill the current element with the location and current weather conditions
      currentElement.innerHTML = `
        <div class="text-center space-y-2">
          <div class="font-bold text-3xl">Current Weather for ${interpretedLocation.name}, ${interpretedLocation.region}</div>
          <div class="font-bold">
            <img src="https://${currentWeather.condition.icon}" class="inline-block">
            <span class="temperature">${currentWeather.temp_f}</span>° 
            and
            <span class="conditions">${currentWeather.condition.text}</span>
          </div>
        </div>
      `

      // Store a reference for the "forecast" element
      let forecastElement = document.querySelector(`.forecast`)

      // Check if the user entered a valid number (> 1)
      if(!(numDays >= 1)){

        // Display an alert if it's not a number larger than 1
        alert(`Please enter a number that is 1 or larger`)

        // If it's a valid number, display forecast for the specified number of days
      } else {

        // First, fill "forecast" element with forecast headline (specific to number of days)
        forecastElement.innerHTML = `
        <div class="font-bold text-3xl">${numDays}-Day Forecast</div>
        `

        // Second, display daily data using a for-loop
        for (i = 0; i < numDays; i++) {

          // Create a variable to store each forecast day in memory
          let forecastDay = dailyForecast.forecastday[i]

          // Insert HTML into the forecast element, using the data from each day
          forecastElement.insertAdjacentHTML (`beforeend`, 
          `<div>
          <img src="https://${forecastDay.day.condition.icon}" class="mx-auto">
          <h1 class="text-2xl text-bold text-gray-500">${forecastDay.date}</h1>
          <h2 class="text-xl">High ${forecastDay.day.maxtemp_f}° – Low ${forecastDay.day.mintemp_f}°</h2>
          <p class="text-gray-500">${forecastDay.day.condition.text}</h1>
        </div>`
        )
      }
    }
    }
  })
})