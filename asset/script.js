//Makeing sure script is connected
console.log("The script is connected");

//cities array
var cities = [];
function getHistory() {
  localStorage.getItem("Cities")
}

//grabs data for the current date api
var currentData = {

};

// grabs the data for the 5 day forcast.
var fivedays = {

};

var weekly = {};


//Grabing elements by id
var searchHistory = document.getElementById("searchHistory");
var searchButton = document.getElementById("search");



var element;
var searchHistoryValue = [];


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
    putHistory.classList.add("history")
    searchHistory.appendChild(putHistory)
    callApi();
});
//End of the eventListener for search button




//add event listener to the divs in the search history.
searchHistory.addEventListener("click", function(event){
  var target = event.target; 
  console.log("element clicked:" , target.innerText)
  searchHistoryValue.push(target.innerText)
  console.log("A element in the search history was clicked");
  callHistoryApi()
})
// End of the event listener on the searchHistory.




//This is a funtion that check to see if the application has been loaded before if it will run addHistoryItem function
function checkForToronto() {
  if (cities.length === 0){
    addHistoryItem ();
   } else {
    //commented out line make it so the value are not overwitten but Toronto is added over and over again.
    callStarterValue ();
   }
}; 
//End of the checkForToronto

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
    callStarterValue();
}
// end of functions that check history. 


//Calls a starter value so there is always data to display.
//Value is set to Toronto to start with.
function callStarterValue() {
    //creates a value to start with 
    var starterValue = "https://api.openweathermap.org/data/2.5/weather?q=toronto&appid=89e0b7e8dbbac9434ed75176dac7f8a3&units=metric"
    var starterValueTwo = "https://api.openweathermap.org/data/2.5/forecast?q=toronto&appid=89e0b7e8dbbac9434ed75176dac7f8a3&units=metric"

    //gets the current weather conditions for starter data
    fetch(starterValue)
    .then(function (response) {
       if (response.ok) {
         response.json().then(function (data) {
         currentData.name = data.name;
         currentData.temp = data.main.temp;
         currentData.humi = data.main.humidity;
         currentData.windspeed = data.wind.speed;
         currentData.icon = data.weather[0].icon;
         console.log(data)
         fillData ();
         //console.log (data.name)
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
         fivedays.data = dataWeekly.list;
        //  fivedays.date = dataWeekly.list[i].dt_txt;
        //  fivedays.temp = dataWeekly.list[i].main.temp;
        //  fivedays.hum = dataWeekly.list[i].main.humidity;
         console.log(dataWeekly)
         filldaily();
         });
       } else {
         console.log('Error: ' + response.statusText);
       }
     })
     .catch(function () {
       console.log('Unable to connect');
     });
    buildHistoryElements ();
    //fillData (data);
} 
//End of the callStarterData



//calls Apis for the cities in the history.
function callHistoryApi(){
  var currentWeatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + searchHistoryValue + "&appid=89e0b7e8dbbac9434ed75176dac7f8a3&units=metric"
  var fiveDayApi = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchHistoryValue + "&appid=89e0b7e8dbbac9434ed75176dac7f8a3&units=metric"

  //gets the current weather conditions for user choosen city
      fetch(currentWeatherApi)
       .then(function (response) {
          if (response.ok) {
            response.json().then(function (data) {
              currentData.name = data.name
              currentData.temp = data.main.temp3
              currentData.humi = data.main.humidity
              currentData.windspeed = data.wind.speed
              currentData.icon = data.weather[0].icon
            console.log(data)
            fillData ();
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
//end of callHistoryApi


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
                currentData.name = data.name
                currentData.temp = data.main.temp
                currentData.humi = data.main.humidity
                currentData.windspeed = data.wind.speed
                currentData.icon = data.weather[0].icon
              console.log(data)
              fillData ();
              });
            } else {
              console.log('Error: ' + response.statusText);
            }
          })
          .catch(function () {
            console.log('Unable to connect');
          });

    //get five day weather for User choosen city
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
    addHistory.classList.add("history")
    searchHistory.appendChild(addHistory)
    }
}
//End of the buildHistoryElements



//Grab elements that need to be filled in with data from the response.
var nameCity = document.querySelector("#nameCity")
var dateHere = document.querySelector("#date")
var today = moment().format("ddd MMM, D");
var temp = document.querySelector("#temp")
var humi = document.querySelector("#humidiy")
var windspeed = document.querySelector("#wind")
var img = document.querySelector("#weatherPicOne")
var image = "http://openweathermap.org/img/w/" + currentData.icon + ".png";



//function builds the data for the curent weather block.
function fillData() {
  console.log(currentData)
  nameCity.textContent = currentData.name;
  dateHere.innerHTML = today;
  // need a way to add the degree symbol to the temp code.
  temp.textContent = Math.floor(currentData.temp);
  humi.textContent = currentData.humi + "%";
  windspeed.textContent= Math.floor(currentData.windspeed);
  // need Help connecting the images to the page
  img.innerHTML("src", image)

}

var fiveday = document.getElementById("fiveDay")


//build elementsfor the 5 day forecast.
function filldaily() {
  console.log(fivedays)

   for (var i = 0; i < 6; i++) {
    var elements = fivedays.data[i];
    console.log(elements);

  //I think I will actally need to come up with a differant way to target the values.
  //creates the blocks the data will sit in.
  var block = document.createElement("div")
  block.classList.add("datesContain")
  //creates a h3 tag for the date
  var dateBlock = document.createElement("h3")
  dateBlock.classList.add("ThisDate")
  dateBlock.textContent = fivedays.data[i].dt_txt
  // creates a p tag for the temp
  var tempBlock = document.createElement("p")
  tempBlock.textContent = Math.floor(fivedays.data[i].main.temp);
  // creates a p tag for the humitiy value
  var humidit = document.createElement("p")
  humidit.textContent = Math.floor(fivedays.data[i].main.humidity) + "%";
  fiveday.appendChild(block)
  block.appendChild(dateBlock)
  block.appendChild(tempBlock)
  block.appendChild(humidit)
}
}

//Call the start of the program.
checkForToronto (getHistory());



// Api Link "https://api.openweathermap.org/data/2.5/weather?q="  CITY NAME HERE  "&appid=Key Here" current weather
// Api Link "https://api.openweathermap.org/data/2.5/forecast?q=" CITY NAME HERE  "&appid=key here" 5 day forcast
//Key 89e0b7e8dbbac9434ed75176dac7f8a3
// useful video https://www.youtube.com/watch?v=InoAIgBZIEA
