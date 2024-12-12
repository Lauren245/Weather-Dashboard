import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lon: string;
  lat: string;
}
// TODO: Define a class for the Weather object

// TODO: Complete the WeatherService class
class WeatherService implements Coordinates{
  // TODO: Define the baseURL, API key, and city name properties
  baseURL: string;
  APIKey: string;
  cityName: string;

  constructor(cityName: string){
    this.baseURL = process.env.API_BASE_URL + "/data/2.5/weather?";
    this.APIKey = process.env.API_KEY || "";
    if(!this.APIKey){
      throw new Error("Error: API_KEY is undefined in the .env file.");
    };
    this.cityName = cityName;
  };
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    try{
      fetch(`${this.baseURL}q=${query}&appid=${this.APIKey}`);

    }catch(error){
      console.error("Error getting weather data for the provided location.");
      throw new Error("Could not find weather data for the provided location.");
    }
      

      
  }
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
}

export default new WeatherService();
