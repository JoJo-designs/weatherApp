//Makeing sure script is connected
console.log("The script is connected");

//cities array
var cities = [];
function getHistory() {
  localStorage.getItem("Cities")
}

var dataValues = {};

//Grabing elements by id
var searchHistory = document.getElementById("searchHistory");
var searchButton = document.getElementById("search");

//Grab elements that need to be filled in with data from the response.
var nameCity = document.querySelector("#nameCity")
console.log(nameCity)


var element;


//Add an eventlistener to the search button
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
    putHistory.dataset.cityname = document.getElementById("searchCities").value
    putHistory.classList.add("history")
    searchHistory.appendChild(putHistory)
    callApi();
});
//End of the eventListener for search button




//add event listener to the divs in the search history.
// I need to make the div clickable - Done
// I need to be able read the value inside the div. - working on
// I need to make the searchValue be equivalant to the value inside 
// I need to run the getApi function.
//I will need some help with this I think.
searchHistory.addEventListener("click", function(){
  console.log("A element in the search history was clicked");
  var selected = document.getElementsByClassName("history");
 // var search = element.dataset.cityname;
  console.log(searchHistory);
  console.log(searchHistory.value);
  console.log(selected);
})
// End of the event listener on the searchHistory.


//This is a funtion that was suppost to check if toronto was already in the array 
function checkForToronto() {
  if (cities.length === 0){
    addHistoryItem ();
   } else {
    //commented out line make it so the value are not overwitten but Toronto is added over and over again.
    callStarterValue ();
   }
}; 
//End of the checkForToronto

function getHistory() {
  //localStorage.getItem("Cities")
  cities = JSON.parse(localStorage.getItem("Cities")) || [];
}

function addHistoryItem(x) {
    //cities = JSON.parse(localStorage.getItem("Cities")) || [];
    cities.push("Toronto");
    localStorage.setItem("Cities", JSON.stringify(cities));
    console.log("put Value");
    callStarterValue ();
}





//Calls a starter value so there is always data to display.
//Value is set to Toronto to start with.
function callStarterValue() {
    //creates a value to start with 
    var starterValue = "https://api.openweathermap.org/data/2.5/weather?q=toronto&appid=89e0b7e8dbbac9434ed75176dac7f8a3&units=metric"
    var starterValueTwo = "https://api.openweathermap.org/data/2.5/forecast?q=toronto&appid=89e0b7e8dbbac9434ed75176dac7f8a3&units=metric"

    //  cities = JSON.parse(localStorage.getItem("Cities")) || [];
    //  cities.push("Toronto")
    //  localStorage.setItem("Cities", JSON.stringify(cities));

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
         response.json().then(function (dataWeekly) {
         console.log(dataWeekly)
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
//End of the callStarterData


//Calls the data for user entered locations
function callApi(){
    var searchValue = document.getElementById("searchCities").value.trim();
    var currentWeatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=89e0b7e8dbbac9434ed75176dac7f8a3&units=metric"
    var fiveDayApi = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=89e0b7e8dbbac9434ed75176dac7f8a3&units=metric"

    //gets the current weather conditions for user choosen city
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

    //et five day weather for User choosen city
          fetch(fiveDayApi)
         .then(function (response) {
            if (response.ok) {
              response.json().then(function (dataWeekly) {
              console.log(dataWeekly)
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
    addHistory.dataset.cityname = elements
    addHistory.classList.add("history")
    searchHistory.appendChild(addHistory)
    }
}
//End of the buildHistoryElements


function fillData(data) {
  
}







//Call the start of the program.
checkForToronto (getHistory());
//callStarterValue ();
//buildHistoryElements ();



// Api Link "https://api.openweathermap.org/data/2.5/weather?q="  CITY NAME HERE  "&appid=Key Here" current weather
// Api Link "https://api.openweathermap.org/data/2.5/forecast?q=" CITY NAME HERE  "&appid=key here" 5 day forcast
//Key 89e0b7e8dbbac9434ed75176dac7f8a3

