# Weather-Dashboard

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) - https://opensource.org/licenses/MIT

## Table of Contents 
[Description](#description)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[My Contributions](#my-contributions)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Error Handling](#error-handling)

[Installation](#installation)

[Usage](#usage)

[Tests](#tests)

[License](#license)

[Questions](#questions)

[Resources](#resources)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[Tutorials and Documentation](#tutorials-and-documentation)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[3rd-Party Software](#3rd-party-software)

[Screenshots](#screenshots)

[Render Deployed Version](#render-deployed-version)

## Description

### Overview
This application is a Weather Dashboard that allows users to search for weather information by city. It provides current weather conditions and a 5-day forecast for the searched city. The application also maintains a search history, allowing users to quickly access weather data for previously searched cities.

The application is built using a client-server architecture. The client side is developed with TypeScript and Vite, and it includes a user interface for searching and displaying weather data. The server side is built with Node.js and Express, handling API requests to fetch weather data and manage search history.

Key features of the application include:

- Searching for weather data by city name.
- Displaying current weather conditions and a 5-day forecast.
- Maintaining a search history with options to delete entries.
- Fetching weather data from an external API.
- Serving static files and handling API routes on the server side.

The application is structured to separate client and server code, with the client side handling the user interface and the server side managing data retrieval and storage.


This application uses an online service called [OpenWeatherMap](https://openweathermap.org/) to get the weather information that is used in this application. OpenWeather map is owned bt OpenWeather Ltd and provides global weather data via API.

### My Contributions
This application was originally developed as part of an assignment for a full-stack development bootcamp [created by EdX](https://www.edx.org/). Some starter code was provided with the completed client side as well as the file structure for the entire application. My job was to write the code for the server side. I also added a portion of the middleware to connect the client and server sides of the application. 

The only code I added to the client side was try/catch block in the fetchWeather function (main.ts line 38).

### Error Handling
I spent a good portion of the development time creating code to handle errors. The error handling code in this project is designed to ensure that the application can gracefully handle and respond to various errors that may occur during its operation. Here are the key aspects of the error handling implemented in this project:

**Client-Side Error Handling:**
 In the fetchWeather function, a try/catch block is used to handle errors that may occur during the API call to fetch weather data. If the API call fails or returns invalid data, an error is caught, logged to the console, and the rendering functions are not called, preventing the creation of weather forecast cards with undefined values.

**Server-Side Error Handling**
In the Express.js routes, try/catch blocks are used to handle errors that may occur during the processing of requests. If an error occurs, it is caught, logged to the console, and an appropriate error response is sent back to the client with a status code of 500.

**WeatherService Error Handling**
In the WeatherService class, error handling is implemented to manage issues that may arise when fetching weather data from an external API. The getWeatherForCity method includes try/catch blocks to handle potential errors during the API calls and data processing.

**HistoryService Error Handling**
In the HistoryService class, error handling is implemented to manage issues that may arise when reading from or writing to the db.json file. Methods like read, write, getCities, addCity, and removeCity include try/catch blocks to handle potential errors during file operations and data processing.

## Installation
**Note: The app does not need to be installed unless you wish to run the app locally on your machine. To just use the app go to https://weather-dashboard-ktb0.onrender.com/** 

To install this application, follow these steps:
1. Clone [repository](https://github.com/Lauren245/Weather-Dashboard)
2. Open code in a code editor such as VS Code.
3. visit the [OpenWeather sign up page](https://home.openweathermap.org/users/sign_up) to create an account and request an API key.
3. create a file called .env inside the server folder. Add two variables to the file:
    - API_BASE_URL=https://api.openweathermap.org
    - API_KEY={insert your API key here}
3. Install dependencies by running the command *npm install* in the root directory using the integrated terminal.
4.  use the integrated terminal at the root directory of the project and run the *npm run start:dev* command to run the application.
5.  Open your web browser and navigate to http://localhost:3000 to access the application.

## Usage
To use this Weather Dashboard application, follow these steps:

1. Launch the Application: 
    - **If running the application locally:** Open your web browser and navigate to http://localhost:3000 to access the application.
    - **If running the application as deployed on Render:** Visit https://weather-dashboard-ktb0.onrender.com/.

2. Search for Weather Data:
    - In the search input field, enter the name of the city for which you want to retrieve weather data.
    - Click the "Search" button or press "Enter" to submit your search.

3. View Current Weather:
    - The application will display the current weather conditions for the searched city, including temperature, wind speed, humidity, and an icon representing the weather.

4. View 5-Day Forecast:
    - Below the current weather conditions, the application will display a 5-day weather forecast for the searched city, including daily temperature, wind speed, humidity, and weather icons.

5. Search History:
    - The application maintains a search history of previously searched cities.
    - Click on any city in the search history to quickly retrieve and display its weather data again.

6. Delete Search History:
    - To delete a city from the search history, click the delete button (represented by a trash can icon) next to the city name in the search history list.

7. Error Handling:
    - If an error occurs while fetching weather data (e.g., invalid city name or network issues), an error message will be displayed in the console, and the application will not render weather data with undefined values.

## Tests
Currently, there are no unit tests. The functionality can be tested by typing both valid and invalid city names into the search bar.

## License
Copyright 2024 Lauren Moore

This software uses an [MIT license](https://opensource.org/license/MIT).

## Questions
If you have additional questions, you can contact me at: 

GitHub: [Lauren245](https://github.com/Lauren245)

Email: laurenmoorejm@gmail.com

## Resources

### Tutorials and Documentation
1. **[Express.js | router.use() Function](https://www.geeksforgeeks.org/express-js-router-use-function/)**
by Geeks for Geeks: Used as a reference for how to use Express.js's router.use() function.

2. **[How to Use API Keys](https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys)** 
by Request-Response The Full-Stack Blog: Used as a reference for how to set up and use an API key.

3. **[Using fetch with TypeScript](https://kentcdodds.com/blog/using-fetch-with-type-script)**
by Kent C. Dodds: Used as a reference for how to make fetch requests when using TypeScript.

4. **[Current weather data documentation](https://openweathermap.org/current)** by OpenWeather: The official documentation for getting current weather data using the OpenWeather API.

5. **[How to correctly use TypeScript types for your API response](https://medium.com/@wujido20/runtime-types-in-typescript-5f74fc9dc6c4)** by Vaclav Hrouda: Used as reference for how to use TypeScript types with API responses.

6. **[Reading files with Node.js](https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs)** by Node.js: The official documentation for how to read file data using Node.js.

7. **[Convert JSON String to Array of JSON Objects in JavaScript](https://www.geeksforgeeks.org/how-to-convert-json-string-to-array-of-json-objects-using-javascript/)** 
by Geeks for Geeks: Used as reference for how to convert a JSON string into an array of JSON objects.

8. **[How to Get a Value from a JSON Array in JavaScript ?](https://www.geeksforgeeks.org/how-to-get-a-value-from-a-json-array-in-javascript/)** 
by Geeks for Geeks: Used a reference for how to get a value from an array of JSON objects.

9. [Help with fs promises](https://chatgpt.com/c/6760b601-5f68-8012-ba28-12719553e45e) I asked chatGPT about the differences between fsPromises.readFile() and fs.readFile().

10. [Help with narrowing error type](https://chatgpt.com/share/6760c2da-fca8-8012-ad26-6513fa5c34ec) 
I asked ChatGPT how to console.error errors with different data types in TypeScript.

11. [Help with fixing deleteCities method](https://chatgpt.com/share/67634f70-3688-8012-a961-4c2a062c4d71)
I asked ChatGPT to examine my code for the deleteCities method. I was encountering issues where I couldn't 
get the findIndex method to work due to differing data types and restriction imposed on the City class.
It also helped me realize that I was not preserving the ids of City objects when I was storing and retrieving cities from the database.

### 3rd-Party Software
1. **[node-randomstring](https://github.com/klughammer/node-randomstring)** Copyright (c) 2012 Elias Klughammer - Licensed under the [MIT license](https://github.com/klughammer/node-randomstring/blob/master/LICENSE).


## Screenshots
![Image of the app running in a browser just after it has been launched. The heading says weather dashboard. The left side of the screen has a search bar with a list of the following cities below it Austin, New York, portland, Seattle. The right side of the screen shows a box. The top of the box says Search for a city in big letters. Below it is text indicating entries for temperature in farenheight, wind in miles per hour, humidity as a percentage. These fields contain no data.](./assets/screenshots/weather-dashboard-on-launch.jpg)

**Image depicting the appearance of the app upon launch with no cities selected.**


![Image of a weather dashboard app running in a browser. The left side features a search bar with a list of cities: Ashland, Austin, New York, Portland, and Seattle (with Ashland now at the top). On the right, a box displays 'Ashland' with the current date (11/20/2024), a cloud icon representing the weather, and details such as temperature, wind speed, and humidity. Below it, a 'Five-Day Forecast' heading appears above five smaller blue boxes, each showing similar details for the subsequent five days. At the bottom of the browser window, the console is open, showing logged data labeled 'weatherData.](./assets/screenshots/weather-dashboard-new-city.jpg)

**Image depicting the addition of a new city (Ashland) to the cities list, along with the city's current weather condtions and a five day forecast.**


![Image of the app running in a browser. The heading says weather dashboard. The left side of the screen has a search bar with a list of the following cities below it Ashland, Austin, New York, portland, Seattle. On the right, a box displays 'New York' with the current date (11/20/2024), a cloud icon representing the weather, and details such as temperature, wind speed, and humidity. Below it, a 'Five-Day Forecast' heading appears above five smaller blue boxes, each showing similar details for the subsequent five days.](./assets/screenshots/weather-dashboard-select-existing-city.jpg)

**Image depicting the weather information for New York upon selecting it from the saved cities list.**


![Screenshot of a weather dashboard web application displayed in a browser. The page is divided into two main sections. On the left, a sidebar contains a search bar labeled 'Search for a City,' with a text input field, a 'Search' button, and a list of cities: Ashland, Austin, New York, and Portland, each with a red delete icon. The city of Seattle is no longer on the list, indicating it was recently deleted. On the right, the main content area displays the selected city's weather data in a white box. The heading reads 'New York (11/20/2024)' with a cloud icon next to it. Below are details: temperature (39.04°F), wind speed (7.85 MPH), and humidity (54%). Beneath this box is a heading labeled '5-Day Forecast,' followed by five smaller blue boxes displaying weather forecasts for subsequent days, including dates, icons representing weather conditions, temperature, wind speed, and humidity levels. At the bottom of the browser window, the console is open, showing logged data labeled 'weatherData'](./assets/screenshots/weather-dashboard-seattle-deleted.jpg)

**Image depicting weather information, but with the city of Seattle missing from the saved cities list.**


![Screenshot of a weather dashboard web application displayed in a browser. The page is divided into two sections. On the left, a sidebar labeled 'Search for a City' contains a text input field, a 'Search' button, and a list of cities: Ashland, Austin, New York, and Portland, each with a red delete icon. Seattle is missing from the list, indicating it has been deleted. On the right, the main area displays a white box with the selected city's weather data. The heading reads 'New York (11/20/2024)' with a cloud icon next to it. Below are details: temperature (39.04°F), wind speed (7.85 MPH), and humidity (54%). Beneath this box is a '5-Day Forecast' section with five blue boxes showing weather forecasts for the next five days, each including a date, a weather icon, temperature, wind speed, and humidity. The browser's console is open at the bottom, showing error messages, including a 500 Internal Server Error for a POST request to the API and a custom error message: 'Error fetching weather data: Error: Failed to fetch weather data for e'.](./assets/screenshots/weather-dashboard-invalid-data-custom-error.jpg)

**Image depicting a custom console error after entering "e" into the search bar instead of a valid city name.**


## Render Deployed Version
[Click here](https://weather-dashboard-ktb0.onrender.com/) to view the app as deployed on Render.

*Note: since it is being hosted on a free tier, it will take a while for the app to load when opening it for the first time.*

--- 
**[Back to Top](#weather-dashboard)**