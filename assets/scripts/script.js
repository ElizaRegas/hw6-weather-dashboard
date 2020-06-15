$(document).ready(function () {
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
      var dateDisplayEl = moment().format('MMMM Do YYYY');
      var icon = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
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

      var uvqueryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=fc53c4afba46f05e9baa04eb35435488&lat=" + lat + "&lon=" + lon;
      
      $.ajax({
        url: uvqueryURL,
        method: "GET"
      }).then(function(response) {
        var uvNumber = response.value;
        console.log(response.value);
        var uvButtonEl = $("<button id='uvButton'>" + response.value + "</button>");
        if (uvNumber <= 3) {
          uvButtonEl.css("background-color", "green");
        } else if (uvNumber > 7) {
          uvButtonEl.css("background-color", "red");
        } else {
          uvIndex.css("background-color", "orange");
        }
        $("#uvIndex").append("UV Index: ").append(uvButtonEl);
      })
    });



    var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityEl.val() + "," + "&units=emperial&appid=fc53c4afba46f05e9baa04eb35435488";
    $.ajax({
      url: forecastQueryURL,
      method: "GET",
    }).then(function(response) {
      console.log(response);
    })
    //     for (var i = 1; i <= 5; i++) {
    //       var forecastTempMinEl = data.list[i].main.temp_min;
    //       var forecastTempMaxEl = data.list[i].main.temp_max;
    //       var forecastDate = moment().add(i, 'days').format("MMMM Do");
    //       var forecastIcon = "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png";
    //       var iconPic = $(".icon").attr("src", forecastIcon);
    //       var displayTempMin = $("<div id='TempMin'></div>");
    //       var displayTempMax = $("<div id='TempMax'></div>");

    //       $(displayTempMin).append("Low: " + Math.floor(forecastTempMinEl));
    //       $(displayTempMax).append("High: " + Math.floor(forecastTempMaxEl));
    //       // $("#forecastTempMax").append("High: " + Math.floor(forecastTempMaxEl));
    //       var newLow = $("<div class='low'></div>");
    //       var newIcon = $("<div class='icon'>" + iconPic + "</div>");
    //       var dateDiv = $("<div class='date'>" + forecastDate + "</div>");
    //       var newCol = $("<div class='col'></div>").append(dateDiv, newIcon, newLow);
    //       $(".row").append(newCol);
    //     }
    //   }
    // );
  });

  // var displayHour = hour > 12 ? hour - 12 : hour;
  // var hourColumn = $("<div class='col-sm-2 timeCol'></div>").text(
  //   displayHour + ":00"
  // );
  // scheduleColumn = $(
  //   `<div class='col-sm-8 schedule' id='${
  //     hour + "a"
  //   }'><input class="inputText"></div>`
  // );
  // var saveColumn = $(
  //   `<div class="col-sm-2" id="save"><button type="button" class="btn btn-info" id='${
  //     hour + "b"
  //   }'><i class="fas fa-save"></i></button></div>`
  // );

//   function emptyInfo() {
//     $("#icon").empty();
//     $("#weather").empty();
//     $("#temp").empty();
//   }
});

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
