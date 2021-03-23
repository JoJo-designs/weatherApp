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
    //cityList.cities = document.getElementById("searchCities").value;
    cityList.cities.push(document.getElementById("searchCities").value)
    console.log(cityList.cities);
    localStorage.setItem("Cities", JSON.stringify(cityList.cities));
});

function buildHistoryElements() {
    //localStorage.getItem( JSON.parse(cityList.cities));

    //for (var i = 0; i < cityList.cities.length; i++) {
       // element = cityList.cities[i];
        
        var createHisory = document.createElement("div") 
        createHisory.textContent = localStorage.getItem( JSON.parse(cityList.cities));
        document.searchHistory.appendChild(createHisory)
    }
//}