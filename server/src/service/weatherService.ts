// Pass cityName to buildGeocodeQuery --> get coords
// Pass


import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
}
// TODO: Define a class for the Weather object
class Weather {
  date: Date;
  icon: string;
  temp: number;
  wind: number;
  humidity: number;

  constructor(date: Date, icon: string, temp: number, wind: number, humidity: number) {
    this.date = date;
    this.icon = icon;
    this.temp = temp;
    this.wind = wind;
    this.humidity = humidity;
  }
}
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties - not sure how to get cityName in here, if it is just going to be passed to methods
  private baseURL?: string;
  private apiKey?: string;

  //removing cityName from constructor, it should come in to each method from the arguments passed to them
  constructor() {
    this.baseURL = process.env.BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
    // this.cityName = cityName //HELP - cityName should be something that we pass as an argument into methods within the class?
  }
  // TODO: Create fetchLocationData method - get the lat and lon from buildGeocodeQuery
  private async fetchLocationData(query: string) {
    var geoCodeData: string = this.buildGeocodeQuery(query)
    return geoCodeData
  }
  // TODO: Create destructureLocationData method - HELP - we should pass the out put of fetchLocationData here as coordinates, and we expect to get coordinates back?
  private destructureLocationData(locationData: Coordinates): Coordinates {

  }

  // TODO: Create buildGeocodeQuery method
    private buildGeocodeQuery(cityName: string): string {
      return `${this.baseURL}/geo/1.0/direct?q=${cityName}&appid=${this.apiKey}`;
    }

  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  // TODO: Create fetchAndDestructureLocationData method - first we fetchLocationData, then we destructureLocationData?
  private async fetchAndDestructureLocationData() {
    return await this.fetchLocationData(this.buildGeocodeQuery(cityName)).then((data) => //HELP - where do I find the argument for buildGeocodeQuery? should it be an argument into this method?
    this.destructureLocationData(data)
  );
  }
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
