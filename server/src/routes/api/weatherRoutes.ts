import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
//?? is this not async because it is a post request?
router.post('/', async (req, res) => {
  console.log("inside default router in weatherRoutes.ts");
  // TODO: GET weather data from city name
  const {cityName} = req.body;
  //check if the city name is valid
  if(!cityName){
    res.status(404).json("No match found for this city name.");
  };
  try{
    const weatherData = await WeatherService.getWeatherForCity(cityName);
    // console.log(`getWeatherForCity returned ${JSON.stringify(weatherData)}`);
    console.log(`typeof weatherData = ${typeof weatherData}`);
    res.json(weatherData);

    // TODO: save city to search history
    HistoryService.addCity(cityName);
  }
  catch(error){
    console.log("Error: " + error);
    res.status(404).json( `Unable to retrieve weather data for ${cityName}.`);
  }
  
});

// TODO: GET search history
router.get('/history', async (_req, res) => {
  try{
    const cities = HistoryService.getCities();
    //send JSON response
    res.json(cities);
  }catch(error){
    console.error("Failed to get city search history.");
  }
});

// * BONUS TODO: DELETE city from search history
//router.delete('/history/:id', async (req, res) => {});

export default router;
