
function getWeatherData(lat, lon) {
    const apiKey = '6e6ade96d8095c12cd33b0c0c68d88b0';
    const forecastURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    fetch(forecastURL)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(function (forecastData) {
            if (!forecastData) {
                console.error('No forecast data from API');
                return;
            }


            // Get the current weather data
            let currentIcon = forecastData.current.weather[0].icon;
            const currentIconURL = "http://openweathermap.org/img/wn/" + currentIcon + ".png";
            console.log(currentIconURL);
            let currentWeather = forecastData.current.weather[0].main + " - " + forecastData.current.weather[0].description;
            let currentTemp = forecastData.current.temp;
            let currentFeelsLike = forecastData.current.feels_like;
            let currentHumidity = forecastData.current.humidity;
            let currentTempC = Math.trunc(currentTemp - 273.15)
            let currentFeelsLikeC = Math.trunc(currentFeelsLike - 273.15)

            // id's for current weather

            let day1 = document.getElementById("day-1");
            let day1temp = document.getElementById("today-temp");
            let day1weather = document.getElementById("today-weather");
            let day1feelsLike = document.getElementById("today-feels-like");
            let day1humidity = document.getElementById("today-humidity");

            let tomorrow = forecastData.daily[1];
            let dayAfterTomorrow = forecastData.daily[2];
            let dayThree = forecastData.daily[3];
            let dayFour = forecastData.daily[4];

            // variables for tomorrow's weather
            let tomorrowIcon = tomorrow.weather[0].icon;
            const tomorrowIconURL = "http://openweathermap.org/img/wn/" + tomorrowIcon + ".png";
            let tomorrowWeather = tomorrow.weather[0].main + " - " + tomorrow.weather[0].description;
            let tomorrowDate = tomorrow.dt;
            let tomorrowTemp = tomorrow.temp.day;
            let tomorrowFeelsLike = tomorrow.feels_like.day;
            let tomorrowHumidity = tomorrow.humidity;
            let tomorrowTempC = Math.trunc(tomorrowTemp - 273.15)
            let tomorrowFeelsLikeC = Math.trunc(tomorrowFeelsLike - 273.15)

            // id's for tomorrow's weather

            let dayTwoTemp = document.getElementById("tomorrow-temp");
            let dayTwoDate = document.getElementById("tomorrow-date");
            let dayTwoWeather = document.getElementById("tomorrow-weather");
            let dayTwoFeelsLike = document.getElementById("tomorrow-feels-like");
            let dayTwoHumidity = document.getElementById("tomorrow-humidity");

            // variables for the day after tomorrow's weather
            let dayAfterIcon = dayAfterTomorrow.weather[0].icon;
            const dayAfterIconURL = "http://openweathermap.org/img/wn/" + dayAfterIcon + ".png";
            let dayAfterWeather = dayAfterTomorrow.weather[0].main + " - " + dayAfterTomorrow.weather[0].description;
            let dayAfterDate = dayAfterTomorrow.dt;
            let dayAfterTemp = dayAfterTomorrow.temp.day;
            let dayAfterFeelsLike = dayAfterTomorrow.feels_like.day;
            let dayAfterHumidity = dayAfterTomorrow.humidity;
            let dayAfterTempC = Math.trunc(dayAfterTemp - 273.15)
            let dayAfterFeelsLikeC = Math.trunc(dayAfterFeelsLike - 273.15)


            // id's for the day after tomorrow's weather

            let dayThreeTemp = document.getElementById("third-temp");
            let dayThreeDate = document.getElementById("third-date");
            let dayThreeWeather = document.getElementById("third-weather");
            let dayThreeFeelsLike = document.getElementById("third-feels-like");
            let dayThreeHumidity = document.getElementById("third-humidity");

            // variables for the fourth day's weather
            let dayFourIcon = dayThree.weather[0].icon;
            const dayFourIconURL = "http://openweathermap.org/img/wn/" + dayFourIcon + ".png";
            let dayFourWeather = dayThree.weather[0].main + " - " + dayThree.weather[0].description;
            let dayFourDate = dayThree.dt;
            let dayFourTemp = dayThree.temp.day;
            let dayFourFeelsLike = dayThree.feels_like.day;
            let dayFourHumidity = dayThree.humidity;
            let dayFourTempC = Math.trunc(dayFourTemp - 273.15)
            let dayFourFeelsLikeC = Math.trunc(dayFourFeelsLike - 273.15)

            // id's for the fourth day's weather
            let FourthDayTemp = document.getElementById("fourth-temp");
            let FourthDayDate = document.getElementById("fourth-date");
            let FourthDayWeather = document.getElementById("fourth-weather");
            let FourthDayFeelsLike = document.getElementById("fourth-feels-like");
            let FourthDayHumidity = document.getElementById("fourth-humidity");

            //variables for the fifth day's weather
            let dayFiveIcon = forecastData.daily[4].weather[0].icon;
            const dayFiveIconURL = "http://openweathermap.org/img/wn/" + dayFiveIcon + ".png";
            let dayFiveWeather = forecastData.daily[4].weather[0].main + " - " + forecastData.daily[4].weather[0].description;
            let dayFiveDate = forecastData.daily[4].dt;
            let dayFiveTemp = forecastData.daily[4].temp.day;
            let dayFiveFeelsLike = forecastData.daily[4].feels_like.day;
            let dayFiveHumidity = forecastData.daily[4].humidity;
            let dayFiveTempC = Math.trunc(dayFiveTemp - 273.15)
            let dayFiveFeelsLikeC = Math.trunc(dayFiveFeelsLike - 273.15)

            // id's for the fifth day's weather
            let FifthDayTemp = document.getElementById("fifth-temp");
            let FifthDayDate = document.getElementById("fifth-date");
            let FifthDayWeather = document.getElementById("fifth-weather");
            let FifthDayFeelsLike = document.getElementById("fifth-feels-like");
            let FifthDayHumidity = document.getElementById("fifth-humidity");


            // variables for the next five days weather
            nextFiveDays = forecastData.daily.slice(1, 6);
            nextFiveDays.forEach(day => {
                console.log(day);

                // Function to format the date as "DDD dd mm yyyy"
                function formatDate(timestamp) {
                    var date = new Date(timestamp * 1000);

                    // Get day of the week (DDD)
                    var daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                    var dayOfWeek = daysOfWeek[date.getDay()];

                    // Get day of the month (dd)
                    var dayOfMonth = date.getDate();

                    // Get month (mm)
                    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    var month = monthNames[date.getMonth()];

                    // Get year (yyyy)
                    var year = date.getFullYear();

                    // Format the date as "DDD dd mm yyyy" and return
                    return `${dayOfWeek} ${dayOfMonth} ${month} ${year}`;
                }

                var formattedDate = formatDate(day.dt);

                // Usage example:
                console.log(formatDate(1612306600)); // Output: "Thu 04 Feb 2021"

                //append the current weather data to the page
                document.getElementById("today-icon").src = currentIconURL;
                day1weather.innerHTML = `Weather: ${currentWeather}`;
                day1temp.innerHTML = `Temperature: ${currentTempC}°C`;
                day1feelsLike.innerHTML = `Feels Like: ${currentFeelsLikeC}°C`;
                day1humidity.innerHTML = `Humidity: ${currentHumidity}%`;

                //append the next five days weather data to the page
                //tomorrow
                document.getElementById("tomorrow-icon").src = tomorrowIconURL;
                dayTwoDate.innerHTML = `Date: ${formatDate(tomorrowDate)}`;
                dayTwoWeather.innerHTML = `Weather: ${tomorrowWeather}`;
                dayTwoTemp.innerHTML = `Temperature: ${tomorrowTempC}°C`;
                dayTwoFeelsLike.innerHTML = `Feels Like: ${tomorrowFeelsLikeC}°C`;
                dayTwoHumidity.innerHTML = `Humidity: ${tomorrowHumidity}%`;

                //day after tomorrow
                document.getElementById("third-icon").src = dayAfterIconURL;
                dayThreeDate.innerHTML = `Date: ${formatDate(dayAfterDate)}`;
                dayThreeWeather.innerHTML = `Weather: ${dayAfterWeather}`;
                dayThreeTemp.innerHTML = `Temperature: ${dayAfterTempC}°C`;
                dayThreeFeelsLike.innerHTML = `Feels Like: ${dayAfterFeelsLikeC}°C`;
                dayThreeHumidity.innerHTML = `Humidity: ${dayAfterHumidity}%`;

                //fourth day
                document.getElementById("fourth-icon").src = dayFourIconURL;
                FourthDayDate.innerHTML = `Date: ${formatDate(dayFourDate)}`;
                FourthDayWeather.innerHTML = `Weather: ${dayFourWeather}`;
                FourthDayTemp.innerHTML = `Temperature: ${dayFourTempC}°C`;
                FourthDayFeelsLike.innerHTML = `Feels Like: ${dayFourFeelsLikeC}°C`;
                FourthDayHumidity.innerHTML = `Humidity: ${dayFourHumidity}%`;

                //fifth day
                document.getElementById("fifth-icon").src = dayFiveIconURL;
                FifthDayDate.innerHTML = `Date: ${formatDate(dayFiveDate)}`;
                FifthDayWeather.innerHTML = `Weather: ${dayFiveWeather}`;
                FifthDayTemp.innerHTML = `Temperature: ${dayFiveTempC}°C`;
                FifthDayFeelsLike.innerHTML = `Feels Like: ${dayFiveFeelsLikeC}°C`;
                FifthDayHumidity.innerHTML = `Humidity: ${dayFiveHumidity}%`;

            });
        });
};