// //while working through - make it so the methods return valid results, even if they are faked.
// this

// // Pass cityName to buildGeocodeQuery --> get coords
// // Pass those coords to 


import dotenv from 'dotenv';
dotenv.config();

// // TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// // TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: Date;
  icon: string;
  tempf: number;
  wind: number;
  humidity: number;

  constructor(city: string, date: Date, icon: string, tempf: number, wind: number, humidity: number) {
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.tempf = tempf;
    this.wind = wind;
    this.humidity = humidity;
  }
}


// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties - not sure how to get cityName in here, if it is just going to be passed to methods
  private baseURL: string;
  private apiKey: string;
  private cityName: string;
  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
    this.cityName = '' 
  }

//   // TODO: Create fetchLocationData method - get the lat and lon from buildGeocodeQuery
  private async fetchLocationData(query: string) {
    try {
      if(!this.baseURL || !this.apiKey){
        throw new Error("please check your url or key in .env")
      }
      const response: Coordinates = await fetch(query).then((res) =>
        res.json()
    );
      return response;
    } catch(error) {
      console.error(error)
      throw error;
    }
  }
//   // TODO: Create destructureLocationData method - HELP - we should pass the out put of fetchLocationData here as coordinates, and we expect to get coordinates back?
  private destructureLocationData(locationData: Coordinates): Coordinates {
    if(!locationData){
      throw new Error("Please pass in a location")
    }
    const { lat, lon } = locationData;
    const coordinates: Coordinates = { //this is the destructuring part, we're taking in something that has extra info, and we're just returning what we want
      lat,
      lon
    }
    return coordinates;
  }

//   // TODO: Create buildGeocodeQuery method //I think this is where I build the query - but I call it with fetch later
    private buildGeocodeQuery(): string {
      const geoQuery = `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&appid=${this.apiKey}`;
      return geoQuery;
    }

//   // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string { // gotta pass coordinates into here, maybe from the destructure location data method?
    const weatherQuery = `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid={API key}`
  return weatherQuery;
  }

  // TODO: Create fetchAndDestructureLocationData method - first we fetchLocationData, then we destructureLocationData?
  private async fetchAndDestructureLocationData() {
    return await this.fetchLocationData(this.buildGeocodeQuery()).then((data) =>
    this.destructureLocationData(data)
  );
  }
//   // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) { //so here we get the weather data as a string, later we parse to json - maybe this needs to be an array?  it looks like we'll need that later on
try {
  const response = await fetch(this.buildWeatherQuery(coordinates)).then((res) => 
    res.json()
  );
  //circle back to this
  // const weatherData: Weather = response
return response;
 // we should get current weather and weather over next five days
  }
catch (error) {
  console.error(error)
  return error
}
}
// //   // TODO: Build parseCurrentWeather method
//   private parseCurrentWeather(response: any) { //here we should take the output of fetchWeatherData, and parse just the first response?
//     const parsedTime = response.list.dt_txt();
//     console.log(parsedTime);

//     var currentWeather = new Weather(
//       this.cityName,
//       date, // figure out how to do date
//       response.weather.icon,
//       response.main.humidity,
//       response.main.temp,
//       response.wind.speed,
//     )
//     return currentWeather;
//   }
//   // TODO: Complete buildForecastArray method
//   private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
//     }

//   }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    console.log(city); // this is just to get rid of error during testing
    // this.buildForecastArray(city);
    console.log(this.fetchAndDestructureLocationData()); //console loggin unused method for testing
    const dummyWeather = {
      lat: 3,
      lon: 3
    }
    console.log(this.fetchWeatherData(dummyWeather)) //console loggin unused method for testing
    const testWeather = new Weather('new york', new Date(), 'test.png', 5, 5, 5) // creating test weather for bug clearing
    console.log(testWeather)
    return true; //using this return for testing



  }
}

export default new WeatherService();
