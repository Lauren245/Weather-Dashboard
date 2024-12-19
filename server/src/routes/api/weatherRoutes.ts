import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  console.log("inside default router in weatherRoutes.ts");
  try{
    // TODO: GET weather data from city name
    const {cityName} = req.body;   
    const weatherData = await WeatherService.getWeatherForCity(cityName);

    if(!weatherData){
      throw new Error(`No weather data exists for ${cityName}.`);
    }
    else{
      res.json(weatherData);
      // TODO: save city to search history
      HistoryService.addCity(cityName);
    }
  }
  catch(error){
    if(error instanceof Error){
      console.error(`\n Error caught in router.post method catch block: ${error.stack}`);
    }
    else{
      console.error(`\n Error caught in / router.post method catch block: ${error}`);
    }
    res.status(500).json("An unexpected error occured");
  }
});

// TODO: GET search history
router.get('/history', async (_req, res) => {
  try{
    const cities = await HistoryService.getCities();
    console.log("CITIES IN HISTORY: ",cities);

    //send JSON response
    return res.json(cities);

  }catch(error){
    console.error(`\n Error caught in /history router.get method catch block: ${error} `);
    return res.status(500).json("An unexpected error occured");
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  try{
    console.log(`req.params = ${JSON.stringify(req.params)}`);
    const {id} = req.params;
    await HistoryService.removeCity(id);
    return res.json("deleted city");
  }catch(error){
    console.error(`\n Error caught in /history/:id router.delete method catch block: ${error}`);
    return res.status(500).json("An unexpected error occured");
  }
});

export default router;
