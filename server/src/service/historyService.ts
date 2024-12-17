import randomString from 'randomstring';
import {promises as fsPromises} from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

// TODO: Define a City class with name and id properties
class City {
  //I want Id to be private since it is going to be used to be used as a unique identifier
  private id: string;
  public name: string;

  constructor(name: string){
    this.id = this.generateRandomString();
    this.name = name;
  }
  private generateRandomString(): string{
    const randomIdString = randomString.generate({
      length: 12,
      charset: 'alphanumeric'
    });
    console.log(`randomIdString = ${randomIdString}`);
    return randomIdString;
  }

  public getId(): string{
    return this.id;
  }
}

// TODO: Complete the HistoryService class
class HistoryService{
  city: City;
  
  constructor(){
    this.city = new City("");   
  }
  
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    try{
      const fileData = await fsPromises.readFile(path.resolve(__dirName, "../../db/db.json"), "utf-8");
      console.log("read file data successfully");
      return fileData;

    }catch(error){
      console.log(error);
      console.error("unable to read file data.");
      return "";
    }
  };
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    try{
      await fsPromises.writeFile(path.resolve(__dirName, "../../db/db.json"), JSON.stringify(cities));
      console.log("City added to history.");

    }catch(error){
      console.error("failed to save city to history.");
    }
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    try{
      const data = await this.read();
      //convert JSON string into an array of usable objects.
      const cities: City[] = JSON.parse(data.toString());
      return cities;
    }catch(error){
      console.error("failed to get cities");
      return "";
    }

  }

  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    try{
      //create a new city object
      const newCity = new City(city);
      //read the existing data
      const fileData = await this.getCities();
      //check if fileData retured an array 
      if(Array.isArray(fileData)){
        const cityExists = fileData.some(existingCity => existingCity.name === newCity.name);
        if(!cityExists){
          //add newly created city objet to array
          fileData.push(newCity);
          await this.write(fileData);
        }else{
          console.log(`${newCity.name} has already been saved to search history.`);
        }
      }
      else{
        throw new Error(`Attempt to add ${city} to search history failed.`);
      }     
    }catch(error){
      if(error instanceof Error){
        console.error('add city encountered an error. Message: ', error.message);
      }
      else{
        console.error('An unknown error has occured.');
      }
    }
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
}

export default new HistoryService();
