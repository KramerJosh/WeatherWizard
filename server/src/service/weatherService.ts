// //while working through - make it so the methods return valid results, even if they are faked.
// this

// // Pass cityName to buildGeocodeQuery --> get coords
// // Pass those coords to 


import dotenv from 'dotenv';
import dayjs, { Dayjs } from 'dayjs';
dotenv.config();

// // TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// // TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: Dayjs | string;
  icon: string;
  tempf: number;
  wind: number;
  humidity: number;

  constructor(city: string, date: Dayjs | string, icon: string, tempf: number, wind: number, humidity: number) {
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
  private baseURL?: string;
  private apiKey?: string;
  private cityName = "" ;
  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
  }

//   // TODO: Create fetchLocationData method - get the lat and lon from buildGeocodeQuery
  private async fetchLocationData(query: string) {
    try {
      if(!this.baseURL || !this.apiKey){
        throw new Error("please check your url or key in .env")
      }
      const response: Coordinates[] = await fetch(query).then((res) =>
        res.json()
    );
      return response[0];
    } catch(error) {
      console.error(error)
      throw error;
    }
  }
// //   // TODO: Create destructureLocationData method - HELP - we should pass the out put of fetchLocationData here as coordinates, and we expect to get coordinates back?
//   private destructureLocationData(locationData: Coordinates): Coordinates {
//     if(!locationData){
//       throw new Error("Please pass in a location")
//     }
//     const { lat, lon } = locationData;
//     const coordinates: Coordinates = { //this is the destructuring part, we're taking in something that has extra info, and we're just returning what we want
//       lat,
//       lon
//     }
//     return coordinates;
//   }

//   // TODO: Create buildGeocodeQuery method //I think this is where I build the query - but I call it with fetch later
    private buildGeocodeQuery(): string {
      console.log(`Test City Name: ${this.cityName}`)
      const geoQuery = `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&appid=${this.apiKey}`;
      return geoQuery;
    }

//   // TODO: Create buildWeatherQuery method //HELP - something going on here, maybe earlier.  Getting wrong latitude, and it's not passing coords as numbers
  private buildWeatherQuery(coordinates: Coordinates): string { // gotta pass coordinates into here, maybe from the destructure location data method?
    const weatherQuery = `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`
    console.log(`lat = ${coordinates.lat}`)
  return weatherQuery;
  }

  // TODO: Create fetchAndDestructureLocationData method - first we fetchLocationData, then we destructureLocationData?
  // fetchLocationData makes sure that user includes the variables this.baseURL and this.baseAPIkey, it also makes sure that the query returns {lat, lon}
  // build geocodequery returns the query string 
  // get data back - specfically lat and long
  
  private async fetchAndDestructureLocationData() {
      return await this.fetchLocationData(this.buildGeocodeQuery()).then(
        (data) => data
      );
}
//   // TODO: Create fetchWeatherData method
// the output of this needs to be manipulated to become an array?
private async fetchWeatherData(coordinates: Coordinates) { //this is where the internal server error is coming from I think
try {
  const response = await fetch(this.buildWeatherQuery(coordinates)).then(
    (res) => res.json()
  );
  if (!response) {
    throw new Error('Weather data not found');
  }

  const currentWeather: Weather = this.parseCurrentWeather(
    response.list[0]
  )

  const forecast: Weather[] = this.buildForecastArray(
    currentWeather,
    response.list
  );

  return forecast;


 // we should get current weather and weather over next five days
  }
catch (error) {
  // console.log(coordinates)
  // console.log(response)
  console.error(error)
  return error
}
}
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {  //response comes from buildweatherquery api call
    const parsedDate = dayjs.unix(response.dt).format('M/D/YYYY')

    var currentWeather = new Weather(
      this.cityName,
      parsedDate,
      response.weather[0].icon,
      response.main.humidity,
      response.main.temp,
      response.wind.speed,
    )
    return currentWeather;
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const weatherForecast: Weather[] = [currentWeather];

    const filteredWeatherData = weatherData.filter((data:any) => {
      return data.dt_txt.includes('12:00:00');
    });

    for (const day of filteredWeatherData) {
      weatherForecast.push(
        new Weather(
          this.cityName,
          dayjs.unix(day.dt).format('M/D/YYYY'),
          day.weather[0].icon,
          day.main.humidity,
          day.main.temp,
          day.wind.speed,
        )
      );
    }

    return weatherForecast;


// first idea for filtering below, keeping in for reference.
    // const forecastArray: Weather[] = [];
    // forecastArray.push(currentWeather); //add the first weather object to the array
    // const perDayWeatherData = weatherData.filter((_, index) => (index) % 8 == 0); //creates a new array with every 8th entry, hopefully that equals 1 per day

    // for (let i = 1; i < 6; i++) { // from day 2 to day 5
    //   const weather = this.parseCurrentWeather(perDayWeatherData[i]) // assign the return of from the method called on each day's data to a constant
    //   forecastArray.push(weather); //add that to the array
    // }
    // return forecastArray;
  }
  

  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    try {
    this.cityName = city; // assign the city argument to this.cityName
      const coordinates = await this.fetchAndDestructureLocationData();
      if (coordinates) {
        const weather = await this.fetchWeatherData(coordinates);
        return weather;
      }

      throw new Error('Weather Data not Found');

      //Old Code
    // } catch (error)

    //   // const weatherData = await this.fetchWeatherData(coordinates);
    //   const currentWeather = this.parseCurrentWeather(weatherData);
    //   console.log(currentWeather);
    //   const fiveDay = this.buildForecastArray(currentWeather, weatherData); //I have to pass in here currentWeather, and a weatherData array

    //   return { currentWeather, fiveDay };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }
}

export default new WeatherService();
