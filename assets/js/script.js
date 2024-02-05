// API key: 6e6ade96d8095c12cd33b0c0c68d88b0
var forecast = document.getElementById("forecast");



$(".input-group-append").on("click", function (event) {
    event.preventDefault()
    var cityName = $("#search-input").val();
    var queryURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=6e6ade96d8095c12cd33b0c0c68d88b0";

    fetch(queryURL)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(function (data) {
            var results = data;

            for (var i = 0; i < results.length; i++) {
                var lat = results[i].lat;
                var lon = results[i].lon;

                let forecastURL = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly&appid=6e6ade96d8095c12cd33b0c0c68d88b0"
                fetch(forecastURL)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (forecastData) {
                        var forecastContainer = document.getElementById("forecast");

                        console.log(forecastData);


                        let currentIcon = forecastData.current.weather[0].icon;
                        const currentIconURL = "http://openweathermap.org/img/wn/" + currentIcon + ".png";
                        ;
                        let currentWeather = forecastData.current.weather[0].main + " - " + forecastData.current.weather[0].description;
                        let currentTemp = forecastData.current.temp;
                        let currentFeelsLike = forecastData.current.feels_like;
                        let currentHumidity = forecastData.current.humidity;
                        let currentTempC = Math.trunc(currentTemp - 273.15)
                        let currentFeelsLikeC = Math.trunc(currentFeelsLike - 273.15)

                        // Create a new <p> element for the current weather entry
                        var currentForecastEntry = document.createElement("p");

                        // Set the content of the <p> element
                        currentForecastEntry.textContent = `Today's Weather forecast: ${currentWeather}, Temperature: ${currentTempC}°C, Feels Like: ${currentFeelsLikeC}°C, Humidity: ${currentHumidity}%`;

                        // Append the <p> element to the forecastContainer
                        forecastContainer.appendChild(currentForecastEntry);



                        nextFiveDays = forecastData.daily.slice(1, 6);
                        nextFiveDays.forEach(day => {
                            var date = new Date(day.dt * 1000);
                            let icon = day.weather[0].icon;
                            const iconURL = "http://openweathermap.org/img/wn/" + icon + ".png";

                            console.log(forecastData);
                            

                            // Get day, month, and year
                            var dayOfMonth = date.getDate();
                            var month = date.getMonth() + 1; // Months are zero-based, so we add 1
                            var year = date.getFullYear();

                            // Pad day and month with leading zeros if necessary
                            dayOfMonth = dayOfMonth < 10 ? '0' + dayOfMonth : dayOfMonth;
                            month = month < 10 ? '0' + month : month;

                            // Format the date as "dd mm yyyy"
                            var formattedDate = `${dayOfMonth} ${month} ${year}`;


                            // Create a new <p> element for the next give day weather entry
                            var nextFiveDaysForecastEntry = document.createElement("p");
                            nextFiveDaysForecastEntry.textContent = `Date: ${formattedDate},  Weather: ${day.weather[0].main}, Temperature: ${Math.trunc(day.temp.day - 273.15)}°C, Feels Like: ${Math.trunc(day.feels_like.day - 273.15)}°C, Humidity: ${day.humidity}%`;

                            // Append the <p> element to the forecastContainer                        
                            forecastContainer.appendChild(nextFiveDaysForecastEntry);

                        });


                    })

                    .catch(function (error) {
                        console.log("Error fetching forecast data:", error);
                    });
            }
        })
});