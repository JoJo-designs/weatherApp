//Makeing sure script is connected
console.log("The script is connected");

//Object to store names of searched cities
var cityList = {
    cities: [],
}
//Grabing elements by id
var searchValue = document.getElementById("searchCities").value;
var searchHistory = document.getElementById("searchHistory");
var searchButton = document.getElementById("search");


searchButton.addEventListener("click", function(){
    console.log("A button was clicked")
    //add the values to local stoarge
    cityList.cities.push(document.getElementById("searchCities").value)
    console.log(cityList.cities);
    localStorage.setItem("Cities", JSON.stringify(cityList.cities));
    // This adds the new divs when the button is clicked they do not stay after the page
    // is refreshed. 
    var addHistory = document.createElement("div")
    addHistory.textContent = document.getElementById("searchCities").value
    searchHistory.appendChild(addHistory)
});

// Function that will hopefully loop thought the values in the cityList.cities array and make 
//a div to display each on the page.
function buildHistoryElements() {
   console.log(localStorage.getItem(cityList.cities));

   //for (var i = 0; i < cityList.cities.length; i++) {
       //const element = cityList.cities[i];
       //}

    // attempt to make just one appear  
    var addHistory = document.createElement("div");
    var cityName = localStorage.getItem( JSON.parse("Cities"))
    addHistory.textContent = cityName
    //line under works but it put the whole array in the div
    //addHistory.textContent = localStorage.getItem(("Cities")
    searchHistory.appendChild(addHistory)
    
}


buildHistoryElements (); 