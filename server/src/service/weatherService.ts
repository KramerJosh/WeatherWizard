// //while working through - make it so the methods return valid results, even if they are faked.

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
// class Weather {
//   date: Date;
//   icon: string;
//   temp: number;
//   wind: number;
//   humidity: number;

//   constructor(date: Date, icon: string, temp: number, wind: number, humidity: number) {
//     this.date = date;
//     this.icon = icon;
//     this.temp = temp;
//     this.wind = wind;
//     this.humidity = humidity;
//   }
// }
// // TODO: Complete the WeatherService class
class WeatherService {
//   // TODO: Define the baseURL, API key, and city name properties - not sure how to get cityName in here, if it is just going to be passed to methods
//   private baseURL?: string;
//   private apiKey?: string;

//   //removing cityName from constructor, it should come in to each method from the arguments passed to them
//   constructor() {
//     this.baseURL = process.env.BASE_URL || '';
//     this.apiKey = process.env.API_KEY || '';
//     // this.cityName = cityName //HELP - cityName should be something that we pass as an argument into methods within the class?
//     // make sure the line above is commented out
//   }
//   // TODO: Create fetchLocationData method - get the lat and lon from buildGeocodeQuery
//   private async fetchLocationData(query: string) {
//     var geoCodeData = await fetch(this.buildGeocodeQuery(query)) //
//     return geoCodeData
//   }
//   // TODO: Create destructureLocationData method - HELP - we should pass the out put of fetchLocationData here as coordinates, and we expect to get coordinates back?
//   private destructureLocationData(locationData: Coordinates): Coordinates {
//     console.log(locationData); // adding this line and the line below with the return to clear an error
//     return locationData; // we're going to need to do like res.city.coord.lat / lon
//     // gonna have to parse out the date from unix as well.  use dayjs
//   }

//   // TODO: Create buildGeocodeQuery method //I think this is where I build the query - but I call it with fetch later
//     private buildGeocodeQuery(cityName: string): string {
//       return `${this.baseURL}/geo/1.0/direct?q=${cityName}&appid=${this.apiKey}`;
//     }

//   // TODO: Create buildWeatherQuery method
//   private buildWeatherQuery(coordinates: Coordinates): string { // gotta pass coordinates into here, maybe from the destructure location data method?
//     return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid={API key}`
//   }

//   // TODO: Create fetchAndDestructureLocationData method - first we fetchLocationData, then we destructureLocationData?
//   private async fetchAndDestructureLocationData() {
//     return await this.fetchLocationData(this.buildGeocodeQuery(cityName)).then((data) => //HELP - where do I find the argument for buildGeocodeQuery? should it be an argument into this method?
//     this.destructureLocationData(data)
//   );
//   }
//   // TODO: Create fetchWeatherData method
//   private async fetchWeatherData(coordinates: Coordinates) { //so here we get the weather data as a string, later we parse to json - maybe this needs to be an array?  it looks like we'll need that later on
//     var weatherData = await fetch(this.buildWeatherQuery(coordinates));
//     return weatherData;
//   }
//   // TODO: Build parseCurrentWeather method
//   private parseCurrentWeather(response: any) { //here we should take the output of fetchWeatherData, and parse just the first response?
//     var currentWeather = this.fetchWeatherData(this.destructureLocationData(this.fetchAndDestructureLocationData())); //not sure what the move here is, just kind of spitballing
//     return currentWeather.json;
//   }
//   // TODO: Complete buildForecastArray method
//   private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
//     var i = 0;
//     for (i = 0; i < 5; i ++) {
      
//     }

//   }
//   // TODO: Complete getWeatherForCity method
//   async getWeatherForCity(city: string) {
//     this.buildForecastArray(city);
//   }
}

export default new WeatherService();
