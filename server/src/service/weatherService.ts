import dotenv from 'dotenv';
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
  date: number; //this doesn't make much sense to me, but this is the only way I am seeing dates formatted when making a test API call
  icon: string;
  iconDescription: string;
  tempF: number; //this needs to become a float
  windSpeed: number;
  humidity: number;

  constructor(city: string, date: number, icon: string, iconDescription: string, tempF: number, windSpeed: number, humidity: number){
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity;
  }

};

// TODO: Complete the WeatherService class
class WeatherService{
  // TODO: Define the baseURL, API key, and city name properties
  baseURL: string;
  APIKey: string;
  cityName?: string;
  //coordinates? : Coordinates; //I made this optional so I could avoid defining coordinates in the constructor. I don't think this is how it is supposed to work
  
  constructor(){
    this.baseURL = process.env.API_BASE_URL + "/data/2.5/weather?";
    this.APIKey = process.env.API_KEY || "";
    if(!this.APIKey){
      throw new Error("Error: API_KEY is undefined in the .env file.");
    };
  };
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    try{
      const response = await fetch(`${this.baseURL}${query}}`);
      
      //convert the returned data into JSON
      const data = await response.json();
      console.log("fetchLocationData: ", data);

      const coordinates: Coordinates = {lat: data.lat, lon: data.lon};

      return coordinates;

    }catch(error){
      console.error("Error getting weather data for the provided location.");
      throw new Error("Could not find weather data for the provided location."); //change how this is done?
    }

    //returns a raw response from the geocode API
      
  }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    try{
        //should return a proper coordinates object.
        console.log("--------------------------------------------");
        console.log("running destructureLocationData method stub");
        console.log(`location Data Coordinates: ${locationData}`);
        console.log("--------------------------------------------");
        return locationData;
    }catch(error){
      console.log("Error: ", error);
      //must use throw here because this method has a return type of coordinates
      throw new Error("Error: Encountered error while destructuring location data.");
    }
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    try{
        console.log("--------------------------------------------");
        console.log("running buildGeocodeQuery method stub");
        console.log("--------------------------------------------");
  
        return `q=${this.cityName}&appid=${this.APIKey}`;

    }catch(error){
      console.log("Error: ", error);
      throw new Error("Error: Encountered error while building geocode query.");;
    }
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    console.log("--------------------------------------------");
    console.log("running buildWeatherQuery method stub");
    console.log("--------------------------------------------");

    return `lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.APIKey}`;

  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    console.log("--------------------------------------------");
    console.log("running fetchAndDestructureLocationData method stub");
    console.log("--------------------------------------------");

    const locationData = await this.fetchLocationData(this.buildGeocodeQuery());
    this.destructureLocationData(locationData)
    this.cityName

    //this method calls fetchLocationData and destructureLocationData
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    console.log("--------------------------------------------");
    console.log("running fetchWeatherData method stub");
    console.log(`Coordinates: ${coordinates}`);
    console.log("--------------------------------------------");
    const coordQuery = this.buildWeatherQuery(coordinates);
    const response = await fetch(`${this.baseURL}${coordQuery}`);
    const weatherData = await response.json();
    console.log(`Weather Data: ${weatherData}`);
    
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    console.log("--------------------------------------------");
    console.log("running parseCurrentWeather method stub");
    console.log(`response: ${response}`);
    console.log("--------------------------------------------");
  }
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
  //   console.log("--------------------------------------------");
  //   console.log("running buildForecastArray method stub");
  //   console.log(`currentWeather: ${currentWeather.json()}`);
  //   if(weatherData){
  //     console.log(`weatherData: ${weatherData}`);
  //   }
  //   console.log("--------------------------------------------");
  // }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    try{
        console.log("--------------------------------------------");
        console.log("running getWeatherForCity method stub");
        console.log(`City: ${city}`);
        console.log("--------------------------------------------");
        this.cityName = city; 
        this.fetchAndDestructureLocationData();
    }catch(error){
      console.log("Error: ", error);
      return error;
    }

  }
}

export default new WeatherService();
