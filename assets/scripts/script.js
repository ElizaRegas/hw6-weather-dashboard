$(document).ready(function () {
  var timeOfDay = moment().format("h:mm:ss a");

  $("#inputForm").on("submit", function (event) {
    event.preventDefault();
    var cityEl = $("#city");
    $.getJSON(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityEl.val() +
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
  });

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
