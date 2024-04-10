import axios from "axios"
import { OPEN_WEATHER_HISTORY_API } from "../Constants"

const HistoryDataAPI = (cityName: string, countryCode: string, startDate: number, endDate: number, responseHandler: CallableFunction, errorHandler: CallableFunction) => {
    axios.get(`${OPEN_WEATHER_HISTORY_API}?q=${cityName},${countryCode}&type=hour&start=${startDate}&end=${endDate}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`).then(response => {
        if (response.status === 200){
            responseHandler(response.data)
        }
    }).catch(error=> errorHandler(error))
}

export {
    HistoryDataAPI
}