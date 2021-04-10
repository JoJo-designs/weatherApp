// Calling to the values.
var searchHistory = document.getElementById("searchHistory");
var searchButton = document.getElementById("search");

//Takes the lat and lon values from the geocodeing api
var latAndLon = {};
var cities = [];
var searchHistoryValue = [];

var displayData = {};
var weeklyData = {};



// Add an event listener to the search button.
searchButton.addEventListener("click", function () {
  console.log("A button was clicked")
  //add the values to local stoarge
  cities = JSON.parse(localStorage.getItem("Cities")) || [];
  cities.push(document.getElementById("searchCities").value);
  localStorage.setItem("Cities", JSON.stringify(cities));
  console.log(cities);
  //Builds elements when new searches are made
  var putHistory = document.createElement("div")
  putHistory.textContent = document.getElementById("searchCities").value
  putHistory.classList.add("history")
  searchHistory.appendChild(putHistory)
  geoApi();
});

//event listener for the elements in the history elements
searchHistory.addEventListener("click", function (event) {
  var target = event.target.innerText;
  console.log("element clicked:", target)
  // searchHistoryValue.push(target.innerText)
  callHistoryApi(target)
})



//This is a funtion that check to see if the application has been loaded before if it will run addHistoryItem function
function checkForToronto() {
  if (cities.length === 0) {
    addHistoryItem();
  } else {
    //commented out line make it so the value are not overwitten but Toronto is added over and over again.
    callStarterData();
  }
};

// function that pulls the cities array from local storage
function getHistory() {
  //localStorage.getItem("Cities")
  cities = JSON.parse(localStorage.getItem("Cities")) || [];
}

// function the pushed the value toronto into the history array when the pae loads 
function addHistoryItem(x) {
  cities.push("Toronto");
  localStorage.setItem("Cities", JSON.stringify(cities));
  console.log("put Value");
  callStarterData();
}
// end of functions that check history and if toronto is already with them. 





//calling the geo codeing api will collect information on the lat and lon values of the cities that were entered.
function geoApi() {
  var searchValue = document.getElementById("searchCities").value.trim();
  var geocodeing = "https://api.openweathermap.org/geo/1.0/direct?q=" + searchValue + "&appid=89e0b7e8dbbac9434ed75176dac7f8a3"

  //gets the current weather conditions for user choosen city
  fetch(geocodeing)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          latAndLon.lat = data[0].lat
          latAndLon.lon = data[0].lon
          latAndLon.nameCity = data[0].name
          console.log(data)
          console.log(latAndLon)
          callApi();
        });
      } else {
        console.log('Error: ' + response.statusText);
      }
    })
    .catch(function () {
      console.log('Unable to connect');
    });
}
//end of geocodeing api call.


//calling the geo codeing api for elements in the history panel. Will collect information on the lat and lon values.
function callHistoryApi(value) {
  var geocodeing = "https://api.openweathermap.org/geo/1.0/direct?q=" + value + "&appid=89e0b7e8dbbac9434ed75176dac7f8a3"

  //gets the current weather conditions for user choosen city
  fetch(geocodeing)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          latAndLon.lat = data[0].lat
          latAndLon.lon = data[0].lon
          latAndLon.nameCity = data[0].name
          console.log(data)
          console.log(latAndLon)
          callApi();
        });
      } else {
        console.log('Error: ' + response.statusText);
      }
    })
    .catch(function () {
      console.log('Unable to connect');
    });
}
//end of geocodeing api call.





//calls the frist set of data this value is set to toronto
function callStarterData() {
  var weatherApi = "https://api.openweathermap.org/data/2.5/onecall?lat=43.7001&lon=-79.4163&exclude=minutely,hourly,alerts&units=metric&appid=89e0b7e8dbbac9434ed75176dac7f8a3"

  //gets the weather for the starter city
  fetch(weatherApi)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data)
          latAndLon.nameCity = "Toronto"
          displayData.temp = data.current.temp;
          displayData.humi = data.current.humidity;
          displayData.uvi = data.current.uvi;
          displayData.windspeed = data.current.wind_speed;
          image = data.current.weather[0].icon;
          displayData.desc = data.current.weather[0].description;
          weeklyData.weekly = data.daily;
          fillInData();
          filldaily();
        });
      } else {
        console.log('Error: ' + response.statusText);
      }
    })
    .catch(function () {
      console.log('Unable to connect');
    });
}



//calling the One call weather Api for values that were searched for and clicked in the history
function callApi() {
  console.log("call api activated")
  var weatherApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latAndLon.lat + "&lon=" + latAndLon.lon + "&exclude=minutely,hourly,alerts&units=metric&appid=89e0b7e8dbbac9434ed75176dac7f8a3"

  //gets the current weather conditions for user choosen city
  fetch(weatherApi)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data)
          displayData.temp = data.current.temp;
          displayData.humi = data.current.humidity;
          displayData.uvi = parseInt(data.current.uvi);
          displayData.windspeed = data.current.wind_speed;
          image = data.current.weather[0].icon;
          console.log("image: ", displayData.icon)
          displayData.desc = data.current.weather[0].description;
          weeklyData.weekly = data.daily;
          fillInData();
          removeFiveDay()
        });
      } else {
        console.log('Error: ' + response.statusText);
      }
    })
    .catch(function () {
      console.log('Unable to connect');
    });
}
//end of callApi


// Function loop thought the values in local storage and builds and element for each.
function buildHistoryElements() {
  console.log("this function is running")
  var location = localStorage.getItem("Cities");
  location = JSON.parse(location)
  console.log(location)

  for (var i = 0; i < location.length; i++) {
    var elements = location[i];
    console.log(elements)

    //Builds the elements in search . 
    var addHistory = document.createElement("div")
    addHistory.textContent = elements
    addHistory.classList.add("history")
    searchHistory.appendChild(addHistory)
  }
}
//End of the buildHistoryElements

//grab elements
var nameCity = document.querySelector("#nameCity")
var dateHere = document.querySelector("#date")
var today = moment().format("ddd MMM, D");
var nextDay = moment().add(1, "d").format("ddd MMM, D");
var temp = document.querySelector("#temp")
var humi = document.querySelector("#humidiy")
var windspeed = document.querySelector("#wind")
var uvi = document.querySelector("#uvIndex")
var img = document.querySelector("#weatherPicOne")
var image = '';
var des = document.querySelector("#des")

function fillInData() {
  nameCity.textContent = latAndLon.nameCity + " Current Weather";
  dateHere.innerHTML = today;
  temp.textContent = "Temperature: " + Math.floor(displayData.temp);
  humi.textContent = "Humidity: " + Math.floor(displayData.humi) + "%";
  windspeed.textContent = "Windspeed: " + Math.floor(displayData.windspeed) + "km";
  uvi.textContent = "UV Index: " + displayData.uvi;
  if (image.length > 0) {
    img.setAttribute("src", `http://openweathermap.org/img/w/${image}.png`);
  }
  $(uvi).removeClass("low mid high");
  if (displayData.uvi === 1 || 2 || 3) {
    uvi.classList.add("low")
  } else if (displayData.uvi === 4 || 5 || 6) {
    uvi.classList.add("mid")
  } else {
    uvi.classList.add("high")
  }
  //need some help to get the image
}

// UV Index range low 1-3 mid 4-6 high 7+


// displayData.temp = data.current.temp;
// displayData.humi = data.current.humidity;
// displayData.uvi = data.current.uvi;
// displayData.windspeed = data.current.wind_speed;
// displayData.icon = data.current.weather[0].icon;
// displayData.desc = data.current.weather[0].description;
// weeklyData.weekly = data.daily;

var fiveday = document.getElementById("fiveDay")


// function will remove the old children before the new ones are built it only removes elements and dosn't build any new ones.
function removeFiveDay() {
  fiveday.innerHTML = "";
  filldaily();
}


// Function builds the elements in the five day weather section
function filldaily() {
  
  //dates are unix time stamped. need to convert from unix to normal time. this works but only give me Api 10 or Jan 19??
  var nextDay = moment(weeklyData.weekly.dt).format("ddd MMM, D");
  console.log(nextDay)
  var nextDay2 = moment(weeklyData.weekly.dt).format("ddd MMM, D");
  console.log(nextDay2)

  for (var i = 0; i < 5; i++) {
    var elements = weeklyData.weekly[i];
    console.log(elements);


    var imag = weeklyData.weekly[i].weather[0].icon;
    //creates the blocks the data will sit in.
    var block = document.createElement("div")
    block.classList.add("datesContain")


    //creates a h3 tag for the date
    var dateBlock = document.createElement("h3")
    dateBlock.classList.add("ThisDate")
    var nextDay = moment(weeklyData.weekly[i].dt[i]).format("ddd MMM, D");
    console.log(nextDay)
    dateBlock.textContent = nextDay;

    // need a way to make the right date appear the api doesn't have dates which is dumd but fine.
    var image = document.createElement("img")
    image.classList.add("fivedayimage")
    image.setAttribute("src", "http://openweathermap.org/img/w/" + imag + ".png");
    // creates a p tag for the temp
    var tempBlock = document.createElement("p")
    tempBlock.textContent = "Temperature: " + Math.floor(weeklyData.weekly[i].temp.day);
    // creates a p tag for the humitiy value
    var humidit = document.createElement("p")
    humidit.textContent = "Humidity: " + Math.floor(weeklyData.weekly[i].humidity) + "%";
    fiveday.appendChild(block)
    block.appendChild(dateBlock)
    block.appendChild(image)
    block.appendChild(tempBlock)
    block.appendChild(humidit)
  }
};

checkForToronto(getHistory());
buildHistoryElements();
