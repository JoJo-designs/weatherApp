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
searchButton.addEventListener("click", function(){
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
searchHistory.addEventListener("click", function(event){
    var target = event.target; 
    console.log("element clicked:" , target.innerText)
    searchHistoryValue.push(target.innerText)
    callHistoryApi()
  })



//This is a funtion that check to see if the application has been loaded before if it will run addHistoryItem function
function checkForToronto() {
    if (cities.length === 0){
      addHistoryItem ();
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
function geoApi(){
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
function callHistoryApi(){
    var geocodeing = "https://api.openweathermap.org/geo/1.0/direct?q=" + searchHistoryValue + "&appid=89e0b7e8dbbac9434ed75176dac7f8a3"

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
function callStarterData(){
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
                displayData.icon = data.current.weather[0].icon;
                displayData.desc = data.current.weather[0].description;
                weeklyData.weekly = data.daily;
                console.log(displayData);
                console.log(weeklyData);
                fillInData ();
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
function callApi(){
    var weatherApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latAndLon.lat + "&lon=" + latAndLon.lon + "&exclude=minutely,hourly,alerts&units=metric&appid=89e0b7e8dbbac9434ed75176dac7f8a3"

    //gets the current weather conditions for user choosen city
        fetch(weatherApi)
         .then(function (response) {
            if (response.ok) {
              response.json().then(function (data) {
               console.log(data)
               displayData.temp = data.current.temp;
               displayData.humi = data.current.humidity;
               displayData.uvi = data.current.uvi;
               displayData.windspeed = data.current.wind_speed;
               displayData.icon = data.current.weather[0].icon;
               displayData.desc = data.current.weather[0].description;
               weeklyData.weekly = data.daily;
               console.log(displayData);
               console.log(weeklyData);
               fillInData();
               filldaily();
               //removeFiveDay()
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

uvIndex
//grab elements
var nameCity = document.querySelector("#nameCity")
var dateHere = document.querySelector("#date")
var today = moment().format("ddd MMM, D");
var temp = document.querySelector("#temp")
var humi = document.querySelector("#humidiy")
var windspeed = document.querySelector("#wind")
var uvi = document.querySelector("#uvIndex")
var img = document.querySelector("#weatherPicOne")
var image = "http://openweathermap.org/img/w/" + displayData.icon + ".png";

function fillInData() {
    nameCity.textContent = latAndLon.nameCity;
    dateHere.innerHTML = today;
    temp.textContent = "Temperature: " + Math.floor(displayData.temp);
    humi.textContent = "Humidity: " + Math.floor(displayData.humi) + "%";
    windspeed.textContent = "Windspeed: " + Math.floor(displayData.windspeed) + "km";
    uvi.textContent = "UV Index: " + displayData.uvi;
    //need some help to get the image
}


// displayData.temp = data.current.temp;
// displayData.humi = data.current.humidity;
// displayData.uvi = data.current.uvi;
// displayData.windspeed = data.current.wind_speed;
// displayData.icon = data.current.weather[0].icon;
// displayData.desc = data.current.weather[0].description;
// weeklyData.weekly = data.daily;

var fiveday = document.getElementById("fiveDay")

    //  attempt to build 
    function filldaily() {
        var fiveDaily = document.querySelector(".fiveDay")
        var dates = document.querySelector(".date")
        var temps = document.querySelector(".Temp")
        var humidity = document.querySelector(".humit")
        console.log(fiveDaily);

    // for (var i = 0; i < fiveDaily.length; i++) {
    //     var spot = fiveDaily[i];
    //     console.log(spot);

        for (var i = 1; i < 6; i++) {
        var elements = weeklyData.weekly[i];
        console.log(elements);
  
        //will add the date.
        dates.textContent = "data"
        // need a way to make the right date appear the api doesn't have dates which is dumd but fine.
        // need an image of the weather appear.
        // adds temp values
        temps.textContent = "Temperature: " + Math.floor(weeklyData.weekly[i].temp.day);
        // add humidity value.
        humidity.textContent = "Humidity: " + Math.floor(weeklyData.weekly[i].humidity) + "%";
        }
    //}
};


// function will remove the old children before the new ones are built it only removes elements and dosn't build any new ones.
function removeFiveDay() {
    var blocks = document.querySelectorAll(".datesContain")
    fiveday.remove(blocks)
    filldaily ();
}

  //ORIGINAL I KNOW IT WORKS 
// // Function builds the elements in the five day weather section
//     function filldaily() {

//         for (var i = 0; i < 5; i++) {
//         var elements = weeklyData.weekly[i];
//         console.log(elements);
  
//     //creates the blocks the data will sit in.
//     var block = document.createElement("div")
//     block.classList.add("datesContain")
//     //creates a h3 tag for the date
//     var dateBlock = document.createElement("h3")
//     dateBlock.classList.add("ThisDate")
//     // need a way to make the right date appear the api doesn't have dates which is dumd but fine.
//     // creates a p tag for the temp
//     var tempBlock = document.createElement("p")
//     tempBlock.textContent = "Temperature: " + Math.floor(weeklyData.weekly[i].temp.day);
//     // creates a p tag for the humitiy value
//     var humidit = document.createElement("p")
//     humidit.textContent = "Humidity: " + Math.floor(weeklyData.weekly[i].humidity) + "%";
//     fiveday.appendChild(block)
//     //block.appendChild(dateBlock)
//     block.appendChild(tempBlock)
//     block.appendChild(humidit)
//   }
// };

checkForToronto(getHistory());
buildHistoryElements();

// List of what it does so far.
// searches the lat and lon of a value input by a user. Adds the city name to local storage
// searches for the data for toronto when lanuched and pushs the value to local storage and no override or repeat addition.
// builds elements for the values in local storage.
// elements in the history clickable and have them call the geocodeing api the the weather api.
// retrive the needed data from the api and push them onto the global scope.
// used data to fill in the elements that were built in the html.
// Build the loop that will build the elements in the 5 day forecast.

// need to build a fuction that will remove children in the five day section. 