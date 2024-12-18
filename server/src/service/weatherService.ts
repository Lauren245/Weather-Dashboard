import dotenv from 'dotenv';
//import { json } from 'node:stream/consumers';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lon: string;
  lat: string;
};
// TODO: Define a class for the Weather object
class Weather{
  //city, date, icon, iconDescription, tempF, windSpeed, humidity
  city: string;
  date: string; //this doesn't make much sense to me, but this is the only way I am seeing dates formatted when making a test API call
  icon: string;
  iconDescription: string;
  tempF: number; //this needs to become a float
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

//TODO: determine how to reformat dates, and fix temperature values.

// TODO: Complete the WeatherService class
class WeatherService{
  // TODO: Define the baseURL, API key, and city name properties
  baseURL: string;
  APIKey: string;
  cityName: string;
  //coordinates? : Coordinates; //I made this optional so I could avoid defining coordinates in the constructor. I don't think this is how it is supposed to work
  
  constructor(){
    // this.baseURL = process.env.API_BASE_URL + "/data/2.5/weather?";
    this.baseURL = process.env.API_BASE_URL + "/data/2.5/";
    this.APIKey = process.env.API_KEY || "";
    this.cityName = "";
    if(!this.APIKey){
      throw new Error("Error: API_KEY is undefined in the .env file.");
    };
  };
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    try{
      //console.log("--------------------------------------------");
      console.log("running fetchLocationData method");
      // console.log(`Query param passed in = ${query}`);
      const response = await fetch(`${this.baseURL}weather?${query}`);
      console.log(` \n API call returned with status: ${response.status}: ${response.statusText}`);
      if(!response.ok){
        console.log("Triggered !response.ok");
        throw new Error(`Could not find weather data for "${this.cityName}".`);
      }
      else{
        //convert the returned data into JSON
        const data = await response.json();
        const coordinates: Coordinates = {lat: data.coord.lat, lon: data.coord.lon};
        console.log(`Coordinates: ${JSON.stringify(coordinates)}`); //TEST OUTPUT
        console.log("end of fetchLocationData method--------------------------------------------");
        return coordinates;
      }

    }catch(error){
      if(error instanceof Error){
        console.error(`\n Error caught in catch block: ${error.stack}`);
      }
      else{
        console.error(`\n Error caught in catch block: ${error}`);
      } 
      // console.log("end of fetchLocationData method--------------------------------------------"); 
      return null;
    }

    //returns a raw response from the geocode API
      
  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    //TODO: figure out a better way to use this method since it is redundant
    //should return a proper coordinates object.
    //console.log("--------------------------------------------");
    //console.log(`locationData = ${JSON.stringify(locationData)}`);
    try{
      console.log("running destructureLocationData method");
      if(!locationData){
          throw new Error(`The provided location data "${JSON.stringify(locationData)}" is not valid.`);
      }
      
      console.log(`location Data Coordinates: ${locationData.lat}, ${locationData.lon}`);
      //console.log("End of destructureLocationData method--------------------------------------------");
      return locationData;
      

    }catch(error){
      //console.log("End of destructureLocationData method--------------------------------------------");
      if(error instanceof Error){
        console.error(`\n Error caught in catch block: ${error.stack}`);
      }
      else{
        console.error(`\n Error caught in catch block: ${error}`);
      } 
      //Rethrow the error to avoid returning a non-coordinate value.
      throw error; 
    }
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    //console.log("--------------------------------------------");
    console.log("running buildGeocodeQuery method");

    //console.log("End of buildGeocodeQuery method --------------------------------------------");
    return `q=${this.cityName}&appid=${this.APIKey}&units=imperial`;
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    //console.log("--------------------------------------------");
    console.log("running buildWeatherQuery method");

    //console.log("End of buildWeatherQuery method--------------------------------------------");
    return `lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.APIKey}&units=imperial`;

  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    try{
      //console.log("--------------------------------------------");
      console.log("running fetchAndDestructureLocationData method");
      
      const locationData = await this.fetchLocationData(this.buildGeocodeQuery());
      //console.log(`locationData = ${JSON.stringify(locationData)}`);
      const coordinates = this.destructureLocationData(locationData as Coordinates);
      console.log(`coordinates = ${JSON.stringify(coordinates)}`);
      //fetch the weather data via the destructured coordinates
      // await this.fetchWeatherData(coordinates);
      console.log("RETURNING COORDINATES");
      //console.log("End of fetchAndDestructureLocationData method--------------------------------------------");
      return coordinates;

    }catch(error){
        //This logs the error thrown at the end of the destructureLocationData method;
        console.log(`\n Error caught in catch block: ${error}`);
        console.log("THROWING ERROR");
        //console.log("End of fetchAndDestructureLocationData method--------------------------------------------");
        return null;     
    }
  }

  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    try{
      console.log("--------------------------------------------");
      console.log("running fetchWeatherData method stub");
      console.log(`Coordinates: ${coordinates.lat}, ${coordinates.lon}`);
      console.log("--------------------------------------------");
      const coordQuery = this.buildWeatherQuery(coordinates);
      const response = await fetch(`${this.baseURL}forecast?${coordQuery}`);
      console.log(` \n API call returned with status: ${response.status}: ${response.statusText}`);
      if(!response.ok){
        console.log("Triggered !response.ok");
        throw new Error(`Could not find weather data for coordinates "${coordinates.lat}, ${coordinates.lon}".`);
      }
        //else statement may or may not be needed here
        const weatherData = await response.json();
        return weatherData;
      

    }catch(error){
      console.log('FETCH WEATHER DATA');
      if(error instanceof Error){
        console.error(`\n Error caught in catch block: ${error.stack}`);
      }
      else{
        console.error(`\n Error caught in catch block: ${error}`);
      } 
      return null;
    }
    
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    try{
        console.log("--------------------------------------------");
        console.log("running parseCurrentWeather method stub");
        //list is the property returned by the API call that holds all the objects.
        const data = response.list[0]; 
        //TEST console logs
        console.log(`data.dt_txt = ${JSON.stringify(data.dt_txt)}` );
        console.log(`typeof data.dt_txt = ${typeof(data.dt_txt)}`);

        //convert the string for datetime to a date so it will be easier to convert its formatting.
        let forcastDate: Date = new Date(data.dt_txt);
         //format the date, then convert it back to a string.
        let formattedDate: string = `${forcastDate.getMonth()}/${forcastDate.getDate()}/${forcastDate.getFullYear()}`;

        //data.weather.description and icon are inside an array that only contains one item, hence the weather[0]
        const currentWeather = new Weather(this.cityName, formattedDate, data.weather[0].icon, data.weather[0].description, 
                                            data.main.temp, data.wind.speed, data.main.humidity);

        console.log(`currentWeather = ${JSON.stringify(currentWeather)}`); //TEST OUTPUT    
        console.log("--------------------------------------------");    
        return currentWeather;

    }catch(error){
      console.error(`\n Error caught in catch block: ${error}`);
      throw error;
    }

  }

  // TODO: Complete buildForecastArray method
    private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
      console.log("--------------------------------------------");
      console.log("running buildForecastArray method stub");
      try{
        let weatherArr: Weather[] = [currentWeather];
        
        for(let i = 0; i < weatherData.length; i++){
            let data = weatherData[i];

            //TEST OUTPUT
            console.log(`data.dt_txt = ${JSON.stringify(data.dt_txt)}` );

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
          console.log("--------------------------------------------");
          return weatherArr;

      }catch(error){
        console.error(`\n Error caught in catch block: ${error}`);
        throw error
      }
    }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    try{
        console.log("--------------------------------------------");
        console.log("running getWeatherForCity method stub");
        console.log(`City: ${city}`);
        //console.log(`API Key = ${this.APIKey}`);
        
        //set the cityName property to the name of the provided city
        this.cityName = city; 

        const coordinates =  await this.fetchAndDestructureLocationData();
        //check if previous method returned null
        if(!coordinates){
          throw new Error(`The value of coordinates is invalid. Coordinates returned: ${coordinates}`);
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
          
          const cityWeather = this.buildForecastArray(currentWeather, weatherArr);
          console.log("--------------------------------------------");
  
          return cityWeather;
        }
    }catch(error){
      if(error instanceof Error){
        console.error(`\n Error caught in catch block: ${error.stack}`);
      }
      else{
        console.error(`\n Error caught in catch block: ${error}`);
      } 
      return null;
    }

  }
}

export default new WeatherService();
