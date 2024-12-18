import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
//?? is this not async because it is a post request?
//TODO: fix so !cityName
router.post('/', async (req, res) => {
  console.log("inside default router in weatherRoutes.ts");
  try{
    // TODO: GET weather data from city name
    const {cityName} = req.body;   
    const weatherData = await WeatherService.getWeatherForCity(cityName);
    //console.log(`getWeatherForCity returned ${JSON.stringify(weatherData)}`);
    console.log(`typeof weatherData = ${typeof weatherData}`);
    if(!weatherData){
      console.log("ROUTER.POST if statement triggered.")
      throw new Error(`No weather data exists for ${cityName}.`);

    }
    else{
      res.json(weatherData);
    }

    // TODO: save city to search history
    HistoryService.addCity(cityName);
  }
  catch(error){
    if(error instanceof Error){
      console.error(`\n Error caught in catch block: ${error.stack}`);
    }
    else{
      console.error(`\n Error caught in catch block: ${error}`);
    }
    return;    
  }
});

// TODO: GET search history
router.get('/history', async (_req, res) => {
  try{
    const cities = await HistoryService.getCities();
    console.log("CITY IS",cities);
    //send JSON response
    return res.json(cities);
  }catch(error){
    console.error("Failed to get city search history.");
    return res.status(500).json("An unexpected error occured");
  }
});

// * BONUS TODO: DELETE city from search history
//router.delete('/history/:id', async (req, res) => {});

export default router;
