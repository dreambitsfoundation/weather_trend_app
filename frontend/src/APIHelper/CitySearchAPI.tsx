import axios from "axios"
import { COUNTRIES_NOW_URL } from "../Constants"

const CitySearchAPI = (name: string, responseHandler: CallableFunction, errorHandler: CallableFunction) => {
    axios.post(`${COUNTRIES_NOW_URL}/countries/cities`, {"country": name}).then(response => {
        if (response.status === 200){
            responseHandler(response.data)
        }
    }).catch(error=> errorHandler(error))
}

export {
    CitySearchAPI
}