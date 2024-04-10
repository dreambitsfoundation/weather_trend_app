import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, useDisclosure } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { CountrySearchAPI } from "../../../APIHelper/CountrySearchAPI"
import { CitySearchAPI } from "../../../APIHelper/CitySearchAPI";
import { WeatherAPICreateLocation } from "../../../APIHelper/WeatherAPI";
import CountryInfoCard from "./CountryInfoCard"
import CitySelection from "./CitySelection"

const AddLocationDrawer = (props: LocationDrawerInterface) => {
  const { onClose } = useDisclosure()
  const btnRef = useRef()
  const [searchKeyWord, setSearchKeyword] = useState("");
  const [countrySearchResults, setCountrySearchResults] = useState([]);
  const [selectedCity, setSelectedCity] = useState();
  const [cityOptions, setCityOptions] = useState([]);
  const [showCountrySearch, setShowCountrySearch] = useState(true);
  const [selectedCountryCode, setSelectedCountryCode] = useState();

  const keyWordChangeHandler = (searchText: string) => {
    setSearchKeyword(searchText);
    CountrySearchAPI(searchText, (response: any[]) => {
        setCountrySearchResults(response)
    }, (error: any) => {console.log(error)})
  }

  const handleDrawerOnClose = () => {
    onClose();
    setShowCountrySearch(true);
    setSelectedCity();
    setSelectedCountryCode();
    props.alterDrawerState(false);
    setCountrySearchResults([]);
    setSearchKeyword("")
  }

  const handleSelectionChangeHandler = (selected: boolean, country: CountrySearchResult) => {
    if (selected){
      setShowCountrySearch(false);
      setSelectedCountryCode(country.countryCode);
      CitySearchAPI(country.common, (response: any[]) => {
            var cityList = []
            response.data.forEach(element => {
                cityList = cityList.concat(element)
            });
            console.log(cityList)
            setCityOptions(cityList)

        }, (error: any) => {console.log(error)})
    }
  }

  const registerCity = () => {
    console.log("Selected country code " + selectedCountryCode)
    WeatherAPICreateLocation(selectedCountryCode, selectedCity, (response:any) => {
      console.log(response)
      handleDrawerOnClose()
    }, (error: any) => {console.log(error)})
  }

  const showDrawerUI = (country: CountrySearchResult) => {
    if(showCountrySearch){
      return (
        <>
        <DrawerHeader>Add a new country</DrawerHeader>

          <DrawerBody>
            <Input placeholder='Type here...' value={searchKeyWord} onChange={event => keyWordChangeHandler(event.target.value)}/>
            <br/><br/>
            {countrySearchResults.map((element, index) => {
                const data = {
                  flag: element["flag"],
                  latitude: element["latlng"][0],
                  longitude: element["latlng"][1],
                  common: element["name"]["common"],
                  official: element["name"]["official"],
                  countryCode: element["cca2"]
                }
                return <CountryInfoCard key={index} selectionHandler={handleSelectionChangeHandler} country={
                  data
                }/>
            })}
          </DrawerBody>

          <DrawerFooter>
            Select suggested items to add to your watchlist.
          </DrawerFooter>
        </>
      )
    } else {
      return (
      <>
        <DrawerHeader>Choose a city</DrawerHeader>

          <DrawerBody>
            <CitySelection cityOptions={cityOptions} selectedCity={setSelectedCity}/>
            {selectedCity? <Button onClick={() => registerCity()}>Add city to watch list</Button>: <>Registering adress...</>}
          </DrawerBody>

          <DrawerFooter>
            Select suggested items to add to your watchlist.
          </DrawerFooter>
        </>
      )
    }
  }

  return (
    <>
      <Drawer
        isOpen={props.drawerState}
        placement='right'
        onClose={handleDrawerOnClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          {showDrawerUI()}
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default AddLocationDrawer;