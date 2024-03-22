import axios from "axios"
import { REST_COUNTRIES_URL } from "../Constants"

const CountrySearchAPI = (name: string, responseHandler: CallableFunction, errorHandler: CallableFunction) => {
    axios.get(`${REST_COUNTRIES_URL}/name/${name}`).then(response => {
        if (response.status === 200){
            responseHandler(response.data)
        }
    }).catch(error=> errorHandler(error))
}

export {
    CountrySearchAPI
}