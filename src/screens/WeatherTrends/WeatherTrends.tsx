import { Box, Button, GridItem, SimpleGrid } from "@chakra-ui/react";
import AddLocationDrawer from "./Components/AddLocationDrawer";
import { useState } from "react";
import CountryInfoCardWatchList from "./Components/CountryInfoCardWatchList";
import DatePicker from "react-datepicker";
import {
  Alert,
  AlertIcon,
} from '@chakra-ui/react'

import "react-datepicker/dist/react-datepicker.css";
import { CitySearchAPI } from "../../APIHelper/CitySearchAPI";
import CitySelection from "./Components/CitySelection";
import { HistoryDataAPI } from "../../APIHelper/OpenWeatherHistoryAPI";

const WeatherTrendView = () => {

    const [openDrawer, setOpenDrawer] = useState(false);
    const [currentCountryList, setCurrentCountryList] = useState([])
    const [selectedCountry, setSelectedCountry] = useState("")
    const [selectedCity, setSelectedCity] = useState("")
    const [countryMapping, setCountryMapping] = useState({})
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [cityOptions, setCityOptions] = useState([])

    const addCountry = (country: CountrySearchResult) => {
        if (!(country.common in countryMapping)){
            countryMapping[country.common] = country;
            setCountryMapping(countryMapping)
            setCurrentCountryList(Object.values(countryMapping));
        }
    }

    const deleteCountry = (country: CountrySearchResult) => {
        if (country.common in countryMapping){
            delete countryMapping[country.common]
            setCountryMapping(countryMapping)
            setCurrentCountryList(Object.values(countryMapping));
        }
    }

    const fetchCitiesForThisCountry = (countryName: string) => {
        // This method shall be used to request City data against Country.
        setSelectedCountry(countryName)
        CitySearchAPI(countryName, (response: any[]) => {
            var cityList = []
            response.data.forEach(element => {
                cityList = cityList.concat(element)
            });
            setCityOptions(cityList)

        }, (error: any) => {console.log(error)})
    }

    const generateBulkReport = () => {
        // This method shall be used to request historical data to OpenWeatherMap API.
        var start = new Date(startDate).getTime();
        var end = new Date(endDate).getTime();
        const countryCode = countryMapping[selectedCountry].countryCode
        
        /** 
         * This API requires a paid plan, the implementation is fine but it will not work
         * until we plug a paid plan to the developer account.
         */
        HistoryDataAPI(selectedCity, countryCode, start, end, (response: any[]) => {
            console.log(response)
        }, (error: any) => {alert("Apologies, this Historic data API won't return value since it requires a paid OpenWeatherMap account.")})
    }

    return (
        <>
        <AddLocationDrawer drawerState={openDrawer} alterDrawerState={setOpenDrawer} addCountry={addCountry} deleteCountry={deleteCountry}/>
        <SimpleGrid columns={{sm:1, md: 2}} spacing={4} padding={3}>
            <GridItem colSpan={1}>
                <br/><br/>
                Selected Countries
                {currentCountryList.map((element, index) => {
                    return (
                        <CountryInfoCardWatchList key={index} removalHandler={deleteCountry} country={element} selectionHandler={fetchCitiesForThisCountry} currentSelectedCountry={selectedCountry}/>
                    )
                })}
                <br/>
                <Button onClick={() => setOpenDrawer(!openDrawer)}>+ Add Country</Button>
            </GridItem>
            <GridItem colSpan={1}>
                <Box style={{marginBottom: "30px"}}>
                    Select Date range
                    <br/>
                    <b>Start date: </b>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                    <b>End date: </b>
                    <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                </Box>
                
                {selectedCountry.length > 0 ? 
                <>
                    <CitySelection cityOptions={cityOptions} selectedCity={setSelectedCity}/>
                    <br/>
                    <Button onClick={() => generateBulkReport()}>Download Report</Button>
                </>
                : <Alert status='warning'>
                    <AlertIcon />
                    Select a country and choose the state to generate report.
                </Alert>}
            </GridItem>
        </SimpleGrid>
        </>
    )
}

export default WeatherTrendView;