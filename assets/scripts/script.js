$(document).ready(function () {
  $("#inputForm").on("submit", function (event) {
    event.preventDefault();
    var cityEl = $("#city");
    var stateEl = $("#state");
    $.getJSON(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityEl.val() +
        "," +
        stateEl.val() +
        "," +
        "&units=imperial&appid=fc53c4afba46f05e9baa04eb35435488",
      function (data) {
        console.log(data);
        var icon =
          "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        var temp = Math.floor(data.main.temp);
        var weather = data.weather[0].main;
        emptyInfo();
        $("#icon").attr("src", icon);
        $("#weather").append(weather);
        $("#temp").append(temp);
      }
    );

    $.getJSON(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        cityEl.val() +
        "," +
        stateEl.val() +
        "," +
        "&units=imperial&appid=fc53c4afba46f05e9baa04eb35435488",
      function (data) {
        for (var i = 1; i <= 2; i++) {
          var forecastTempMinEl = data.list[i].main.temp_min;
          var forecastTempMaxEl = data.list[i].main.temp_max;

          var displayTempMin = $("<div id='TempMin'></div>");

          $(displayTempMin).append("Low: " + Math.floor(forecastTempMinEl));
          console.log(forecastTempMinEl);
          // $("#forecastTempMax").append("High: " + Math.floor(forecastTempMaxEl));
          var currentDate = moment().add(i, 'days');
          console.log(currentDate);
        }
      }
    );
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
  // var newRow = $(`<div class='row' id='${hour}'></div>`).append(
  //   hourColumn,
  //   scheduleColumn,
  //   saveColumn
  // );
  // $(".container").append(newRow);

  function emptyInfo() {
    $("#icon").empty();
    $("#weather").empty();
    $("#temp").empty();
  }
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
