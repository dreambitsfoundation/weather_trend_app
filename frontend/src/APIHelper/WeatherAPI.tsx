import axios from "axios";
import { BACKEND_HOST_API } from "../Constants";

const WeatherAPICreateLocation = (
  countryCode: string,
  cityName: string,
  responseHandler: CallableFunction,
  errorHandler: CallableFunction
) => {
  console.log("internal: " + countryCode);
  axios
    .post(`${BACKEND_HOST_API}/locations`, {
      city: cityName.toLowerCase(),
      country_code: countryCode.toLowerCase(),
    })
    .then((response) => {
      if (response.status === 200) {
        responseHandler(response.data);
      }
    })
    .catch((error) => errorHandler(error));
};

const WeatherAPIGetLocations = (
  responseHandler: CallableFunction,
  errorHandler: CallableFunction
) => {
  axios
    .get(`${BACKEND_HOST_API}/locations`)
    .then((response) => {
      if (response.status === 200) {
        responseHandler(response.data);
      }
    })
    .catch((error) => errorHandler(error));
};

const WeatherAPIGetUpdate = (
  weatherUpdateHash: string,
  responseHandler: CallableFunction,
  errorHandler: CallableFunction
) => {
  axios
    .get(`${BACKEND_HOST_API}/weather_update/${weatherUpdateHash}`)
    .then((response) => {
      if (response.status === 200) {
        responseHandler(response.data);
      }
    })
    .catch((error) => errorHandler(error));
};

const WeatherAPIDownloadReport = (
  weatherUpdateHash: string,
  startDate: string,
  endDate: string,
  responseHandler: CallableFunction,
  errorHandler: CallableFunction
) => {
  axios
    .get(
      `${BACKEND_HOST_API}/download_report/${weatherUpdateHash}?start_date=${startDate}&end_date=${endDate}`
    )
    .then((response) => {
      if (response.status === 200) {
        responseHandler(response.data);
      }
    })
    .catch((error) => errorHandler(error));
};

export {
  WeatherAPICreateLocation,
  WeatherAPIGetLocations,
  WeatherAPIGetUpdate,
  WeatherAPIDownloadReport,
};
