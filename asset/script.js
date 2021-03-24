//Makeing sure script is connected
console.log("The script is connected");

//Object to store names of searched cities
//var cityList = {
   // cities: [],
//}

var cities = [];

//Grabing elements by id
var searchValue = document.getElementById("searchCities").value;
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
});

// Function loop thought the values in local storageand builds and element for each.
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

buildHistoryElements (); 

//might help https://stackoverflow.com/questions/45721167/localstorage-array-is-being-overwritten-after-refresh/45723442

    //cities = JSON.parse(localStorage.getItem("Cities")) || [];
    //cities.push(searchValue);
    //localStorage.setItem("Cities", JSON.stringify(cities));