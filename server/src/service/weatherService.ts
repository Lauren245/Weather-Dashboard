import dotenv from 'dotenv';
//import { json } from 'node:stream/consumers';
dotenv.config();

// DONE: Define an interface for the Coordinates object
interface Coordinates {
  lon: string;
  lat: string;
};
// DONE: Define a class for the Weather object
class Weather{
  //city, date, icon, iconDescription, tempF, windSpeed, humidity
  city: string;
  date: string; //this doesn't make much sense to me, but this is the only way I am seeing dates formatted when making a test API call
  icon: string;
  iconDescription: string;
  tempF: number; 
  windSpeed: number;
  humidity: number;

  constructor(city: string, date: string, icon: string, iconDescription: string, tempF: number, windSpeed: number, humidity: number){
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }

};

// DONE: Complete the WeatherService class
class WeatherService{
  // DONE: Define the baseURL, API key, and city name properties
  baseURL: string;
  APIKey: string;
  cityName: string;
  constructor(){
    this.baseURL = process.env.API_BASE_URL + "/data/2.5/";
    this.APIKey = process.env.API_KEY || "";
    this.cityName = "";
  };
  // DONE: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    try{
      //console.log("running fetchLocationData method");
      const response = await fetch(`${this.baseURL}weather?${query}`);

      console.log(` \n API call returned with status: ${response.status}: ${response.statusText}`);

      //DONE: update this so the response is checking for more specific error codes.
      if(!response.ok){
        throw new Error(`Could not find weather data for "${this.cityName}".`);
      }
      else{
        //convert the returned data into JSON
        const data = await response.json();
        const coordinates: Coordinates = {lat: data.coord.lat, lon: data.coord.lon};

        return coordinates;
      }

    }catch(error){
      if(error instanceof Error){
        console.error(`\n Error caught in fetchLocationData method catch block: ${error}`);
      }
      else{
        console.error(`\n Error caught in fetchLocationData method catch block: ${error}`);
      } 
      
      return null;
    }

    //returns a raw response from the geocode API
      
  }
  // DONE: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    /*!!! NOTE: Since the method stub we were provided for this method 
    requires location data to be of type Coordinates before it is passed into this
    method; it means that there is nothing for this method to do. I added a try/catch block,
    but since locationData is passed in as coordinates, and the method that generates
    those coordinates will return null if the API call fails, which will throw to the
    try/catch block in fetchAndRestructure data and completely bypasses calling this method.*/
    try{
      console.log("\n running destructureLocationData method");

      if(!locationData){
          throw new Error(`The provided location data "${JSON.stringify(locationData)}" is not valid.`);
      }
      
      console.log(`location Data Coordinates: ${locationData.lat}, ${locationData.lon}`);
      return locationData;
      

    }catch(error){
      if(error instanceof Error){
        console.error(`\n Error caught in destrureLocationData method catch block: ${error.stack}`);
      }
      else{
        console.error(`\n Error caught in destrureLocationData method catch block: ${error}`);
      } 
      //Throw error again since a non Coordinates object(or type) cannot be returned.
      throw error; 
    }
  }

  // DONE: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    console.log("\n running buildGeocodeQuery method");

    return `q=${this.cityName}&appid=${this.APIKey}&units=imperial`;
  }

  // DONE: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    console.log("\n running buildWeatherQuery method");

    return `lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.APIKey}&units=imperial`;
  }

  // DONE: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    try{
      console.log("\n running fetchAndDestructureLocationData method");
      
      const locationData = await this.fetchLocationData(this.buildGeocodeQuery());
      if(!locationData){
        throw new Error(`Invalid locationData. locationData returned "${locationData}"`);
      }
    
      const coordinates = this.destructureLocationData(locationData as Coordinates);
      if(!coordinates){
        throw new Error(`Invalid coordinates. coordinates returned "${coordinates}"`);
      }
    
      return coordinates;

    }catch(error){
        console.error(`\n Error caught in fetchAndDestructureLocationData method catch block: ${error}`);
        return null;     
    }
  }

  // DONE: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    try{
      console.log("\n running fetchWeatherData method");

      const coordQuery = this.buildWeatherQuery(coordinates);

      const response = await fetch(`${this.baseURL}forecast?${coordQuery}`);

      console.log(` \n API call returned with status: ${response.status}: ${response.statusText}`);

      if(!response.ok){
        throw new Error(`Could not find weather data for coordinates "${coordinates.lat}, ${coordinates.lon}".`);
      }

      const weatherData = await response.json();

      return weatherData;
      

    }catch(error){
      if(error instanceof Error){
        console.error(`\n Error caught in fetchWeatherData method catch block: ${error.stack}`);
      }
      else{
        console.error(`\n Error caught in fetchWeatherData method catch block: ${error}`);
      } 
      return null;
    }
    
  }
  // DONE: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    try{
        console.log("\n running parseCurrentWeather method");
        //list is the property returned by the API call that holds all the objects.
        const data = response.list[0]; 
        //convert the string for datetime to a date so it will be easier to convert its formatting.
        let forcastDate: Date = new Date(data.dt_txt);
         //format the date, then convert it back to a string.
        let formattedDate: string = `${forcastDate.getMonth()}/${forcastDate.getDate()}/${forcastDate.getFullYear()}`;

        //data.weather.description and icon are inside an array that only contains one item, hence the weather[0]
        const currentWeather = new Weather(this.cityName, formattedDate, data.weather[0].icon, data.weather[0].description, 
                                            data.main.temp, data.wind.speed, data.main.humidity);

        console.log(`currentWeather = ${JSON.stringify(currentWeather)}`); //TEST OUTPUT        
        return currentWeather;

    }catch(error){
      console.error(`\n Error caught in parseCurrentWeatherMethod catch block: ${error}`);
      return null;
    }

  }

  // DONE: Complete buildForecastArray method
    private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
      console.log(" \n running buildForecastArray method");
      try{
        let weatherArr: Weather[] = [currentWeather];
        
        for(let i = 0; i < weatherData.length; i++){
            let data = weatherData[i];

            //convert the string for datetime to a date so it will be easier to convert its formatting.
            let forcastDate: Date = new Date(data.dt_txt);
            //format the date, then convert it back to a string.
             let formattedDate: string = `${forcastDate.getMonth()}/${forcastDate.getDate()}/${forcastDate.getFullYear()}`;

            //data.weather.description and icon are inside an array that only contains one item, hence the weather[0]
            let weatherObj = new Weather(this.cityName, formattedDate, data.weather[0].icon, data.weather[0].description, 
                                            data.main.temp, data.wind.speed, data.main.humidity);
            //TEST OUTPUT
            console.log(`WeatherObj = ${JSON.stringify(weatherObj)}`);  
            
            //push the new weather object onto the weatherArr
            weatherArr.push(weatherObj);
        }
          return weatherArr;

      }catch(error){
        console.error(`\n Error caught in buildForecastArray method catch block: ${error}`);
        //Throw error again to avoid returning a value here.
        throw error
      }
    }
  // DONE: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    try{
        console.log("\n running getWeatherForCity method");
        console.log(`City: ${city}`);
        
        //set the cityName property to the name of the provided city
        this.cityName = city; 

        const coordinates =  await this.fetchAndDestructureLocationData();

        //check if previous method returned null
        if(!coordinates){
          throw new Error(`The value of coordinates is invalid. Coordinates returned: "${coordinates}"`);
        }
        else{
          const weatherData = await this.fetchWeatherData(coordinates);

          //stringify the weather Data
          JSON.stringify(weatherData);
  
          //returns the current weather which is parsed out from response
          const currentWeather = await this.parseCurrentWeather(weatherData);
  
          const dataArr = Array.isArray(weatherData.list) ? weatherData.list : [weatherData];

          //create a new empty array to hold the selected data from dataArr.
          const weatherArr: any[] = [];
  
          for(let i = 0; i < dataArr.length; i++){
              //check if the dt_txt value for the data represents a new day. 
                //The first timestamp in a new day will include "00:00:00"
              if(dataArr[i].dt_txt.includes("00:00:00")){
                  weatherArr.push(dataArr[i]);
              }
          }
          if(!currentWeather){
            console.log("triggered !currentWeather if statement")
            console.log(`The value of currentWeather is invalid. currentWeather returned "${currentWeather}".`);
          }
          else{
            const cityWeather = this.buildForecastArray(currentWeather, weatherArr);

            return cityWeather;
          }
          //an error is thrown here because the code cannot reach this point and have a valid value
            //AND this prevents the issues of not having all code paths return a value.
          throw new Error()
        }
    }catch(error){
      if(error instanceof Error){
        console.error(`\n Error caught in getWeatherForCity method catch block: ${error.stack}`);
      }
      else{
        console.error(`\n Error caught in getWeatherForCity method catch block: ${error}`);
      } 
      return null;
    }

  }
}

export default new WeatherService();
