window.onload = function () {

    document.getElementById("weatherSubmit").addEventListener("click", function (event) {
        event.preventDefault();
        const value = document.getElementById("weatherInput").value;
        if (value === "") return;
        console.log(value);

        const key = "38ac84dd240729ceb6d8583b6d2e7f8e"; //my API key for Open Weather Map

        const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=" + key;

        fetch(weatherUrl)
            .then(function (response) {
                return response.json();
            }).then(function (json) {
                console.log(json);

                let results = "";

                if (json.cod === 200) {

                    document.getElementById("weatherHeading").innerHTML = "Current Weather In " + json.name;

                    results += '<div id="weatherHead" class="row">';
                    for (let i = 0; i < json.weather.length; i++) {
                        results += '<img id ="main-img" src="https://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
                    }
                    results += '<h3>' + json.main.temp + " &deg;F</h3>";

                    for (let i = 0; i < json.weather.length; i++) {
                        results += '<p>' + json.weather[i].description;
                        if (i !== json.weather.length - 1) {
                            results += ", ";
                        }
                        results += '</p>';

                    }
                    results += '</div>';

                    results += '<div class="row">';
                    results += '<div class="square">';
                    results += '<h3>High</h3>';
                    results += '<p>' + json.main.temp_max + " &deg;F</p>";
                    results += '</div>';

                    results += '<div class="square">';
                    results += '<h3>Low</h3>';
                    results += '<p>' + json.main.temp_min + " &deg;F</p>";
                    results += '</div>';

                    results += '<div class="square">';
                    results += '<h3>Humidity</h3>';
                    results += '<p>' + json.main.humidity + " &deg;F</p>";
                    results += '</div>';

                    results += '<div class="square">';
                    results += '<h3>Pressure</h3>';
                    results += '<p>' + json.main.pressure + " &deg;F</p>";
                    results += '</div>';

                    results += '<div class="square">';
                    results += '<h3>Wind speed</h3>';
                    results += '<p>' + json.wind.speed + " &deg;F</p>";
                    results += '</div>';
                    results += '</div>'

                } else {
                    document.getElementById("weatherHeading").innerHTML = "Unable to fetch data";
                }

                document.getElementById("weatherResults").innerHTML = results;
            });

        forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + value + ",US&units=imperial" + "&APPID=" + key;
        fetch(forecastUrl)
            .then(function (response) {
                return response.json();
            }).then(function (json) {
                console.log(json);

                let results = "";

                if (json.cod === "200") {
                    for (let i = 0; i < json.list.length; i++) {

                        /*row*/
                        if (i % 8 === 0) {
                            var date = new Date();
                            var day = date.getDay() + i / 8;
                            console.log(day);
                            var dayOfWeek = getDayOfWeek(day);
                            results += '<h3>' + dayOfWeek + "</h3>";
                            results += '<div class="row">';
                        }

                        /*box*/
                        results += '<div class="box">';
                        results += '<img src="https://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>';
                        results += '<h3>' + json.list[i].main.temp + " &deg;F</h3>";
                        results += '<p>high ' + json.list[i].main.temp_max + " &deg;F</p>";
                        results += '<p>low ' + json.list[i].main.temp_min + " &deg;F</p>";
                        results += '<p>humidity ' + json.list[i].main.humidity + "%</p>";
                        results += '<p>wind ' + json.list[i].wind.speed + " mph</p>";

                        results += '</div>';

                        /*end row*/
                        if (i % 8 === 7) {
                            results += '</div>';
                        }
                    }

                    document.getElementById("forecastHeading").innerHTML = "5 Day 3 Hour Forecast";
                    document.getElementById("3hourResults").innerHTML = results;

                } else {
                    document.getElementById("forecastHeading").innerHTML = "Unable to fetch data";
                    document.getElementById("3hourResults").innerHTML = "";
                }

            });

    });

    const getDayOfWeek = function (day) {
        var answer;
        switch (day) {
            case 1: answer = "Monday";
                break;
            case 2: answer = "Tuesday";
                break;
            case 3: answer = "Wednesday";
                break;
            case 4: answer = "Thursday";
                break;
            case 5: answer = "Friday";
                break;
            case 6: answer = "Saturday";
                break;
            default: answer = "Sunday";
                break;
        }
        return answer;
    }

}