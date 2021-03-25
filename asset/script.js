//Makeing sure script is connected
console.log("The script is connected");

//Object to store names of searched cities
//var cityList = {
   // cities: [],
//}

var cities = [];

//Grabing elements by id
var searchHistory = document.getElementById("searchHistory");
var searchButton = document.getElementById("search");



//Add an eventlistener to the search button
searchButton.addEventListener("click", function(){
    console.log("A button was clicked")
    //add the values to local stoarge
    cities = JSON.parse(localStorage.getItem("Cities")) || [];
    cities.push(document.getElementById("searchCities").value);
    localStorage.setItem("Cities", JSON.stringify(cities));
    console.log(cities);
    callApi();
});

//This is a funtion that was suppost to check if toronto was already in the array it work once than broke
function checkForToronto() {
  if (cities.indexOf("Toronto")){
     callStarterValue ();
   } else {
    //commented out line make it so the value are not overwitten but makes it so Toronto is added over and over again.
    //cities = JSON.parse(localStorage.getItem("Cities")) || [];
    cities.push("Toronto")
    localStorage.setItem("Cities", JSON.stringify(cities));
     callStarterValue ();
   }
};



//Calls a starter value so there is always data to display
function callStarterValue() {
    //creates a value to start with
    var starterValue = "https://api.openweathermap.org/data/2.5/weather?q=toronto&appid=89e0b7e8dbbac9434ed75176dac7f8a3&units=metric"
    var starterValueTwo = "https://api.openweathermap.org/data/2.5/forecast?q=toronto&appid=89e0b7e8dbbac9434ed75176dac7f8a3&units=metric"

    //gets the current weather conditions for starter data
    fetch(starterValue)
    .then(function (response) {
       if (response.ok) {
         response.json().then(function (data) {
         console.log(data)
         });
       } else {
         console.log('Error: ' + response.statusText);
       }
     })
     .catch(function () {
       console.log('Unable to connect');
     });

//Get five day weather for the starter data.
     fetch(starterValueTwo)
    .then(function (response) {
       if (response.ok) {
         response.json().then(function (data) {
         console.log(data)
         });
       } else {
         console.log('Error: ' + response.statusText);
       }
     })
     .catch(function () {
       console.log('Unable to connect');
     });
    buildHistoryElements ();
}




function callApi(){
    //I need to come up with a way to get the value of the input box and use it as part of the link.
    var searchValue = document.getElementById("searchCities").value.trim();
    var currentWeatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=89e0b7e8dbbac9434ed75176dac7f8a3&units=metric"
    var fiveDayApi = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=89e0b7e8dbbac9434ed75176dac7f8a3&units=metric"

    //gets the current weather conditions
        fetch(currentWeatherApi)
         .then(function (response) {
            if (response.ok) {
              response.json().then(function (data) {
              console.log(data)
              });
            } else {
              console.log('Error: ' + response.statusText);
            }
          })
          .catch(function () {
            console.log('Unable to connect');
          });

    //get five day weather
          fetch(fiveDayApi)
         .then(function (response) {
            if (response.ok) {
              response.json().then(function (data) {
              console.log(data)
              });
            } else {
              console.log('Error: ' + response.statusText);
            }
          })
          .catch(function () {
            console.log('Unable to connect');
          });
}

// Function loop thought the values in local storage and builds and element for each.
function buildHistoryElements() {
    console.log("this function is running")
    var location = localStorage.getItem("Cities");
    location = JSON.parse(location)
    console.log(location)
    //above this line is working

    for (var i = 0; i < location.length; i++) {
        var elements = location[i];
        console.log(elements)
    
    //Builds the elements. 
    var addHistory = document.createElement("div")
    addHistory.textContent = elements
    searchHistory.appendChild(addHistory)
    }
}

//callStarterValue();
checkForToronto ();

// API Link api.openweathermap.org/data/2.5/weather?q=  CITY NAME HERE  &appid=89e0b7e8dbbac9434ed75176dac7f8a3
//Key 89e0b7e8dbbac9434ed75176dac7f8a3