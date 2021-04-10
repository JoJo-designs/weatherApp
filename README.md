# weatherApp

The goal of this assigment is to bulid an app that will use the open weather api to inform the user about the weather in meny differant cities. It should have the ability to search for cities and display a wide range of data for the city. inclueing a 5 day forcast current conditions and the UV index.

No starter files were provided for this assigment.

The frist thing I completed was to make the elements I would needed in the html. 

The next thing I want to get working is the search system. It needed to pull in the data for the searched city and save the name in local storage and create a new element in the search history section. I think I will try to get the value into local storage frist. I want to put the values in an array. After I able to save mulitple values to the array I will make a function that will loop the values and create a element for each one on the page. I am now able to build elements from the items on the array and the values are not overwitten when I refresh the page and add a new value. My next task is to be able to build a link to the api and recerive a responce with the information given.

This link to the api is now working and I create a second function that will automatically call the weather data for toronto and push it into the history array when the program loads. This got rid of an error that would happen where their were no values saved in local storage. I was able to do this without needing to ask for any help so it is a personal win! this function runs everytime it is refreshed so I need come up with a way to stop it from adding toronto over and over. 

I have been able to call the data for the api using the elements from the history and the values entered by the user as well as the value that is loaded when the program loads.

What I still need to accomplish is finding a way to push the retrived data values to the global scope so I can use it to build the elements that display the data. I will also need to make a four loop that build the 5 day forcast elements since their will be muilple of these these. The data I need to build the elements is now in the global scope. I have used the data to build the current weather section.

My next step is to build the five day forecast. I think I will start by making and appending the data for one day after I do that I will build a forloop to handle the rest. 

I am A little upset I just can to a Awful realization. I was calling the wrong API's I was on the right site but there was one api that would have given me all the data for both areas. I am actally really upset right now. I really thougth I was doing a good job with this one. I guess I have to start from scratch. well not scratch I think I have a pretty good starting point I just need to change the apis.

To get all the data I need in from one api I need to call an api that will give me the lat and lon values. Becuase for whatever reason the one-call api can't take just a city name I think it is dumd but I will call the Geocodeing api and take the lat and lon values and than use them to call the api for the given city.




