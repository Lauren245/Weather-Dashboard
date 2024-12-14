import { Router } from 'express';
const router = Router();

// import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
//?? is this not async because it is a post request?
router.post('/', (req, res) => {
  // TODO: GET weather data from city name
  const {cityName} = req.body;
  //check if the city name is valid
  if(!cityName){
    return res.status(404).json("No match found for this city name.");
  };
  try{
    const weatherData = WeatherService.getWeatherForCity(cityName);
  }
  catch(error){
    console.log("Error: " + error);
    return res.status(404).json( `Unable to retrieve weather data for ${cityName}.`);
  }
  // TODO: save city to search history
});

// TODO: GET search history
router.get('/history', async (req, res) => {});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {});

export default router;
