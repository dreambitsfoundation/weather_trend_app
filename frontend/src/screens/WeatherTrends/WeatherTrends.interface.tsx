interface CountrySearchResult {
  flag: string;
  common: string;
  official: string;
  latitude: number;
  longitude: number;
  countryCode: string;
}

interface LocationDrawerInterface {
  drawerState: boolean;
  alterDrawerState: CallableFunction;
  addCountry: CallableFunction;
  deleteCountry: CallableFunction;
}

interface CountryInfoCardInterface {
  country: CountrySearchResult;
  selectionHandler: CallableFunction;
}

interface CountryInfoCardWatchlistInterface {
  country: CountrySearchResult;
  removalHandler: CallableFunction;
  currentSelectedCountry: string;
  selectionHandler: CallableFunction;
}

interface SavedLocations {
  address: string;
  last_updated: number;
  hash: string;
}

interface Coordinates {
  // Location of an address
  lat: number;
  lon: number;
}

interface WeatherInfo {
  // Individual weather information
  id: string;
  main: string;
  description: string;
  icon: string;
}

interface TemperatureInfo {
  // Temperature insight
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface WindInfo {
  // Wind insight
  speed: number;
  deg: number;
}

interface CloudInfo {
  // Cloud infomation
  all: number;
}

interface LocationInfo {
  // Location information.
  country: string;
  sunrise: number;
  sunset: number;
}

interface WeatherUpdate {
  // This model is the representation of a weather update.
  coord: Coordinates;
  weather: WeatherInfo[];
  main: TemperatureInfo;
  wind: WindInfo;
  clouds: CloudInfo;
  sys: LocationInfo;
  name: str;
  last_updated?: number;
}

interface WeeklyWeatherUpdate {
  // This model is the representation of a week of weather update
  average_temp: number;
  updates: WeatherUpdate[];
}

interface WeatherViewPropsInterface {
  // This interface shall be used to pass props to WeatherView
  addressHash: string;
}
