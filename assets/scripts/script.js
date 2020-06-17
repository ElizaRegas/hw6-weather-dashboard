$(document).ready(function () {

  function getStoredSearches() {
    // pulling information from local storage to render weather info from the last searched city
    var storedSearches = window.localStorage.getItem("city");
    // checking to see if the array is empty
    if (storedSearches === null) {
      storedSearches = "[]";
    }
    // changing json stored string to an array
    storedSearches = JSON.parse(storedSearches);
    // returning the storedSearches var for later use
    return storedSearches;
  }

  var storedSearches = getStoredSearches();
  // rendering the last searched city to the page on load
  var lastSearchedCity = storedSearches[0];
  $("#city").val(lastSearchedCity);
  window.onload = function (event) {
    if (lastSearchedCity) {
      event.preventDefault();
      weatherInformation(lastSearchedCity, false);
    }
  };

  function generateHistoryButtons() {
    // getting an updated version of the stored searches
    storedSearches = getStoredSearches();
    $("#savedSearch").empty();
    // rendering buttons with the saved searches
    for (var i = 0; i < 8; i++) {
      if (storedSearches[i] === undefined) {
        return; // could have used "continue" here, but went with return for familiarity        
      } else {
        var newButton = $(
          "<button class='savedSearches'>" + storedSearches[i] + "</button>"
        ).on("click", function () {
          var cityEl = $(this).text();
          weatherInformation(cityEl, false);
        });
        $("#savedSearch").append(newButton);
      }
    }
  }
  generateHistoryButtons();

  // on-click function for searches
  $("#inputForm").on("submit", function () {
    var cityEl = $("#city");
    weatherInformation(cityEl.val(), true);
  });

  // function to get weather information- passing in the city and a boolean to determine whether or not
  // to write the info to local storage
  function weatherInformation(city, isWritingToLocalStorage) {
    event.preventDefault();
    $("#forecastDiv").empty();
    $("#uvIndex").empty();
    // info variables
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=83de499cf8e8b0bfe81af754d679a48b";

    // api call to get today's weather
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      var cityDisplayEl = response.name;
      var dateDisplayEl = moment().format("MMMM Do YYYY");
      var icon =
        "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
      var temp = "Temperature: " + Math.floor(response.main.temp) + " °F";
      var humidity = "Humidity: " + response.main.humidity + "%";
      var wind = "Wind Speed: " + response.wind.speed.toFixed(1) + " MPH";
      var lat = response.coord.lat;
      var lon = response.coord.lon;
      $("#cityDisplay").text(cityDisplayEl + " " + dateDisplayEl);
      $("#icon").attr("src", icon);
      $("#wind").text(wind);
      $("#temp").text(temp);
      $("#humidity").text(humidity);
      // setting the query url to get the uv index
      var uvqueryURL =
        "https://api.openweathermap.org/data/2.5/uvi?appid=83de499cf8e8b0bfe81af754d679a48b&lat=" +
        lat +
        "&lon=" +
        lon;
      // api call to get the uv index
      $.ajax({
        url: uvqueryURL,
        method: "GET",
      }).then(function (response) {
        var uvNumber = response.value;
        var uvButtonEl = $(
          "<button id='uvButton'>" + response.value + "</button>"
        );
        if (uvNumber <= 3) {
          uvButtonEl.css("background-color", "green");
        } else if (uvNumber > 7) {
          uvButtonEl.css("background-color", "red");
        } else {
          uvIndex.css("background-color", "orange");
        }
        $("#uvIndex").append("UV Index: ").append(uvButtonEl);
      });
    });
    // setting the forecast query to get the 5 day forecast
    var forecastQuery =
      "https://api.openweathermap.org/data/2.5/forecast/?q=" +
      city +
      "&units=imperial&appid=83de499cf8e8b0bfe81af754d679a48b";
    // api call to get 5 day forecast
    $.ajax({
      url: forecastQuery,
      method: "GET",
    }).then(function (response) {
      // weeding through the 40 item list to get the 5 day forecast
      var forecastArray = response.list;
      var filteredForecastArray = forecastArray.filter(function (listObj) {
        // targeting the date and time info to return daily information for 8:00AM Atlanta time
        var timeStamp = listObj.dt_txt;
        var timeCheck = timeStamp.includes("12:00:00");
        return timeCheck; // returning a boolean
      });

      // for loop to populate the forecast info
      for (var i = 0; i < filteredForecastArray.length; i++) {
        var forecastItem = filteredForecastArray[i];
        var forecastTemp = forecastItem.main.temp;
        var forecastHumidity = forecastItem.main.humidity + "%";
        var forecastDate = moment()
          .add(i + 1, "d")
          .format("MMMM Do");
        var forecastIcon =
          "http://openweathermap.org/img/w/" +
          forecastItem.weather[0].icon +
          ".png";
        var temperature = $(
          "<div class='temperature'>Temp: " + Math.floor(forecastTemp) + "°F</div>"
        );
        var newHumidEl = $(
          "<div id='newHumid'>Humidity: <br>" + forecastHumidity + "</div>"
        );
        var newIcon = $("<img src='" + forecastIcon + "'/>");
        var dateDiv = $("<div class='date'>" + forecastDate + "</div>");
        var newCol = $(
          "<div class='col card' id='forecast'" + i + "></div>"
        ).append(dateDiv, newIcon, temperature, newHumidEl);
        $("#forecast" + i).attr("src", forecastIcon);
        $("#forecastDiv").append(newCol);
      }
    });
    // writing to local storage
    if (isWritingToLocalStorage) {
      // var to retrieve stored searches
      var currentCityArray = getStoredSearches();
      currentCityArray.unshift(city);
      window.localStorage.setItem("city", JSON.stringify(currentCityArray));
      $("#city").val("");
    }
    generateHistoryButtons();
  }
});