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


searchButton.addEventListener("click", function(){
    console.log("A button was clicked")
    //add the values to local stoarge
    cities.push(document.getElementById("searchCities").value)
    console.log(cities);
    localStorage.setItem("Cities", JSON.stringify(cities));
    // This adds the new divs when the button is clicked they do not stay after the page
    // is refreshed. 
    var addHistory = document.createElement("div")
    addHistory.textContent = document.getElementById("searchCities").value
    searchHistory.appendChild(addHistory)
});

// Function that will hopefully loop thought the values in the cities array and make 
//a div to display each on the page. so far it doesn't do any of that.
function buildHistoryElements() {
    console.log("this function is running")
    var location = localStorage.getItem("Cities");
    location = JSON.parse(location)
    console.log(location)
    //above this line is working

    for (var i = 0; i < location.length; i++) {
        var elements = location[i];
    }
    console.log(location[i])
    console.log(elements)


}

buildHistoryElements (); 