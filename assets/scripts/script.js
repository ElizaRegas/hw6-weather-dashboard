$(document).ready(function () {
  var lastSearch = window.localStorage.getItem('city');
  console.log(lastSearch);
  $('#city').val(lastSearch);
  $("#inputForm").on("submit", function (event) {
    event.preventDefault();
    $("#uvIndex").empty();
    var cityEl = $("#city");
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityEl.val() +
      "," +
      "&units=imperial&appid=fc53c4afba46f05e9baa04eb35435488";
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
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

      $.ajax({
        url: uvqueryURL,
        method: "GET",
      }).then(function (response) {
        var uvNumber = response.value;
        console.log(response.value);
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

      // for (var i = 1; i <= 5; i++) {
      //   console.log(response);
        
      //   $.ajax({
      //     url: "https://api.openweathermap.org/data/2.5/weather?q=" +
      //     cityEl.val() +
      //     "," +
      //     "&units=imperial&appid=fc53c4afba46f05e9baa04eb35435488";
      //   })
      //   var forecastTempMinEl = response.main.temp_min;
      //   var forecastTempMaxEl = response.main.temp_max;
      //   var forecastIcon = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
      //   var newLow = $("<div class='low'>Low: " + forecastTempMinEl + "</div>");
      //   var newHigh = $("<div class='high'>High: " + forecastTempMaxEl + "</div>");
      //   var newIcon = $("<img src='" + forecastIcon + "'></div>");
      //   var dateDiv = $("<div class='date'>" + forecastDate + "</div>");
      //   var newCol = $("<div class='col' id='forecast'" + i + "></div>").append(dateDiv, newIcon, newLow, newHigh);
      //   // $("#forecast" + i).attr("src", forecastIcon);
      //   $("#forecastDiv").append(newCol);
      // }
      // var cityId = response.sys.id;
    });
    var forecastQuery =
      "https://api.openweathermap.org/data/2.5/forecast/?q=" +
      cityEl.val() +
      "&units=imperial&appid=a5e5240beae7c329a8e79847c343d8d3";
      console.log(forecastQuery);

    $.ajax({
      url: forecastQuery,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      var forecastArray = response.list;
      console.log(forecastArray);

      // for (var i = 0; i < forecastArray.length; i++) {
        // var forecastObj = forecastArray[i];
        var filteredForecastArray = forecastArray.filter(function(listObj) {
          var timeStamp = listObj.dt_txt;
          var timeCheck = timeStamp.includes('12:00:00');
          console.log(timeCheck);
          return timeCheck; // returning a boolean
        });
        console.log(filteredForecastArray);



        // var timeStamp = forecastObj.dt_txt;
        // var forecastDate = moment(timeStamp).format("");
        // console.log(timeStamp);
        // console.log(forecastDate);
        // console.log(forecastDate);

        // if (forecastEntry.includes(""))
      // }
      // var forecastTempMinEl = response.main.temp_min;
      // var forecastTempMaxEl = response.main.temp_max;
      // var forecastIcon =
      //   "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
      // var newLow = $("<div class='low'>Low: " + forecastTempMinEl + "</div>");
      // var newHigh = $(
      //   "<div class='high'>High: " + forecastTempMaxEl + "</div>"
      // );
      // var newIcon = $("<img src='" + forecastIcon + "'></div>");
      // var dateDiv = $("<div class='date'>" + forecastDate + "</div>");
      // var newCol = $("<div class='col' id='forecast'" + i + "></div>").append(
      //   dateDiv,
      //   newIcon,
      //   newLow,
      //   newHigh
      // );
      // $("#forecast" + i).attr("src", forecastIcon);
      // $("#forecastDiv").append(newCol);
    });

    // var cityToBeStored = function (name, key, value) {

    //   // Get the existing data
    //   var existing = localStorage.getItem(name);
    
    //   // If no existing data, create an array
    //   // Otherwise, convert the localStorage string to an array
    //   existing = existing ? JSON.parse(existing) : {};
    
    //   // Add new data to localStorage Array
    //   existing[key] = value;
    
    //   // Save back to localStorage
    //   localStorage.setItem(name, JSON.stringify(existing));
    
    // };

    window.localStorage.setItem('city', cityEl.val());
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
