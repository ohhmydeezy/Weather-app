const apiKey = '6e6ade96d8095c12cd33b0c0c68d88b0';
const apiUrl = 'https://api.openweathermap.org/'
const inputGroup = $("#search-button");
const iconUrl = "http://openweathermap.org/img/wn/";
const fiveDayBox = document.getElementById("five-day-box");


const saveSearch = cityName => {
    const searches = JSON.parse(localStorage.getItem("searches")) || [];
    if (searches.indexOf(cityName) === -1) {
        searches.push(cityName);
        localStorage.setItem("searches", JSON.stringify(searches));
        const searchHistory = document.getElementById("history");
        const searchItem = document.createElement("button");
        searchItem.classList.add("btn", "btn-secondary", "btn-block");
        searchItem.textContent = cityName;
        searchHistory.appendChild(searchItem);
    }
};

const getCityData = async (cityName) => {
    const queryUrl = `${apiUrl}geo/1.0/direct?limit=1&appid=6e6ade96d8095c12cd33b0c0c68d88b0&q=`;
    try {
        const response = await fetch(`${queryUrl}${cityName}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching city data:', error);
    }
}

const getForecastData = async (cityData) => {
    const lat = cityData[0].lat;
    const lon = cityData[0].lon;
    const forecastUrl = `${apiUrl}data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    try {
        const response = await fetch(forecastUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching forecast data:', error);
    }
    for (let i = 0; i < data.length; i++) {
        console.log(i);
    }

};

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

function convertTemp(kelvin) {
    return Math.trunc(kelvin - 273.15);
}

// display the next 5 days weather
function displayNextFiveDays(forecastData) {
    const nextFiveDays = forecastData.daily.slice(0, 5);
    fiveDayBox.innerHTML = "";
    nextFiveDays.forEach(day => {
        const formattedDate = formatDate(day.dt);
        let weatherIcon = `${iconUrl}${day.weather[0].icon}.png`;
        let weather = day.weather[0].main + " - " + day.weather[0].description;
        const temp = convertTemp(day.temp.day);
        const feelsLike = convertTemp(day.feels_like.day);
        const humidity = day.humidity;
        fiveDayBox.innerHTML += `
        <div class="col-lg-12 pb-3"> 
        <section id="today" class="mt-3" role="region" aria-live="polite">
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-2">
                        <img src="${weatherIcon}" class="img-fluid rounded-start" id="today-icon" alt="Weather Icon">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${formattedDate}</h5>
                            <p class="card-text" id="today-weather">Weather: ${weather}</p>
                            <p class="card-text" id="today-temp">Temperature: ${temp}°C</p>
                            <p class="card-text" id="today-feels-like">Feels like: ${feelsLike}°C</p>
                            <p class="card-text" id="today-humidity">Humidity: ${humidity}%</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
        `
    });

};

// event listener for search button

inputGroup.on("click", async function (event) {
    event.preventDefault()
    const cityName = $("#search-input").val();
    const cityData = await getCityData(cityName);
    const forecastData = await getForecastData(cityData);
    displayNextFiveDays(forecastData);
    saveSearch(cityName);
});

//event listener for search history
$("#history").on("click", "button", async function (event) {
    event.preventDefault();
    const cityName = event.target.textContent;
    const cityData = await getCityData(cityName);
    const forecastData = await getForecastData(cityData);
    displayNextFiveDays(forecastData);
});

