import randomString from 'randomstring';
import {promises as fsPromises} from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

// DONE: Define a City class with name and id properties
class City {
  //I want Id to be private since it is going to be used to be used as a unique identifier
  private id: string;
  public name: string;

  constructor(name: string, id?: string){
    this.id = id || this.generateRandomString();
    this.name = name;
  }
  private generateRandomString(): string{
    const randomIdString = randomString.generate({
      length: 12,
      charset: 'alphanumeric'
    });
    return randomIdString;
  }

  public getId(): string{
    return this.id;
  }
}

// DONE: Complete the HistoryService class
class HistoryService{
  city: City;
  
  constructor(){
    this.city = new City("");   
  }
  
  // DONE: Define a read method that reads from the searchHistory.json file
  private async read() {
    try{
      const fileData = await fsPromises.readFile(path.resolve(__dirName, "../../db/db.json"), "utf-8");
      console.log("\n read file data successfully");
      return fileData;

    }catch(error){
      console.error(`\n Error caught in read method catch block: ${error}`);
      return null;
    }
  };
  // DONE: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    try{
      await fsPromises.writeFile(path.resolve(__dirName, "../../db/db.json"), JSON.stringify(cities));
      console.log("\n City added to history.");

    }catch(error){
      console.error(`\n Error caught in write method catch block: ${error}`);
    }
  }
  // DONE: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    try{
      const data = await this.read();
      //check if read() returned a null value
      if(!data){
        throw new Error("Unable to read data from the database.");
      }

      const citiesData = JSON.parse(data.toString());
      if(!Array.isArray(citiesData)){
        throw new Error("parsed data is not an array");
      }

      //convert JSON string into an array of usable objects.
      const cities = citiesData.map((item: any) => new City(item.name, item.id));
      return cities;

    }catch(error){
      if(error instanceof Error){
        console.error(`\n Error caught in getCities method catch block: ${error.stack}`);
      }
      else{
        console.error(`\n Error caught in getCities method catch block : ${error}`);
      }
      return [];
    }

  }

  // DONE Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    try{
      //create a new city object
      const newCity = new City(city);
      //read the existing data
      const fileData = await this.getCities();
      //check if getCities() returned a null value
      if(!fileData){
        throw new Error("Unable to add city to history because the attempt to get cities failed.");
      }
      //check if fileData retured an array 
      if(Array.isArray(fileData)){
        const cityExists = fileData.some(existingCity => existingCity.name === newCity.name);
        if(!cityExists){
          //add newly created city objet to array
          fileData.push(newCity);
          await this.write(fileData);
        }else{
          console.log(`\n ${newCity.name} has already been saved to search history.`);
        }
      }
      else{
        throw new Error(`Attempt to add ${city} to search history failed.`);
      }     
    }catch(error){
      if(error instanceof Error){
        console.error(`\n Error caught in addCity method catch block: ${error.stack}`);
      }
      else{
        console.error(`\n Error caught in addCity method catch block: ${error}`);
      }
    }
  }
  // * BONUS DONE: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) { 
    try{
      console.log(`id passed in ${id}.`);
      const citiesArr = await this.getCities();
      //if citiesArr.length does equal 0, that means the catch block for getCities was triggered.
      if(citiesArr.length === 0){
        throw new Error("failed to retrieve data from database, because the database contents could not be read.");
      }
      const index = citiesArr.findIndex((item: City) => item.getId() === id);

      if(index !== -1){
        console.log(`\n Index = ${index}: ${JSON.stringify(citiesArr[index])}`);
        //remove city
        citiesArr.splice(index, 1);
        //rewrite the array of cities
        await this.write(citiesArr);
      }
      else{
        console.log(`\n Index = ${index}: ${JSON.stringify(citiesArr[index])}`);
        throw new Error(`Could not find a city at index ${index}`);
      }
    }catch(error){
      if(error instanceof Error){
        console.error(`\n Error caught in removeCity method catch block: ${error.stack}`);
      }
      else{
        console.error(`\n Error caught in removeCity method catch block: ${error}`);
      }
    }
      
  }
}

export default new HistoryService();
