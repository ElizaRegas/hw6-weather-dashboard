$(document).ready(function () {
  // pulling information from local storage to populate weather info from the last searched city
  var lastSearch = window.localStorage.getItem("city");
  // $("#city").val(lastSearch);
  // on-click function for searches
  $("#inputForm").on("submit", function (event) {
    event.preventDefault();
    $("#uvIndex").empty();

    var cityEl = $("#city");
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityEl.val() +
      "," +
      "&units=imperial&appid=fc53c4afba46f05e9baa04eb35435488";
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

      var uvqueryURL =
        "https://api.openweathermap.org/data/2.5/uvi?appid=fc53c4afba46f05e9baa04eb35435488&lat=" +
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

    var forecastQuery =
      "https://api.openweathermap.org/data/2.5/forecast/?q=" +
      cityEl.val() +
      "&units=imperial&appid=a5e5240beae7c329a8e79847c343d8d3";
    // api call to get 5 day forecast
    $.ajax({
      url: forecastQuery,
      method: "GET",
    }).then(function (response) {
      // weeding through the 40 item list to get the 5 day forecast
      var forecastArray = response.list;
      var filteredForecastArray = forecastArray.filter(function (listObj) {
        var timeStamp = listObj.dt_txt;
        var timeCheck = timeStamp.includes("12:00:00");
        console.log(timeCheck);
        return timeCheck; // returning a boolean
      });
      console.log(filteredForecastArray);

      // for loop to populate the forecast info
      for (var i = 0; i < filteredForecastArray.length; i++) {
        var forecastItem = filteredForecastArray[i];
        var forecastTemp = forecastItem.main.temp;
        var forecastDate = moment().add(i + 1, 'd').format("MMMM Do");
        var forecastIcon =
          "http://openweathermap.org/img/w/" +
          forecastItem.weather[0].icon +
          ".png";
        var temperature = $(
          "<div class='temperature'>Temperature: " + forecastTemp + "</div>"
        );
        var newIcon = $("<img src='" + forecastIcon + "'/>");
        var dateDiv = $("<div class='date'>" + forecastDate + "</div>");
        var newCol = $("<div class='col' id='forecast'" + i + "></div>").append(
          dateDiv,
          newIcon,
          temperature
        );
        $("#forecast" + i).attr("src", forecastIcon);
        $("#forecastDiv").append(newCol);
      }
    });

    // array to store searched cities
    // var pushCity = searchedCityArray.unshift(cityEl.val());
    window.localStorage.setItem("city", cityEl.val());
  });
});

//   function emptyInfo() {
//     $("#icon").empty();
//     $("#weather").empty();
//     $("#temp").empty();
//   }
// });

// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// WHEN I open the weather dashboard
// THEN I am presented with the last searched city forecast
