import {
  Button,
  GridItem,
  SimpleGrid,
  Center,
  Heading,
} from "@chakra-ui/react";
import AddLocationDrawer from "./Components/AddLocationDrawer";
import { useState, useEffect } from "react";
import CountryInfoCardWatchList from "./Components/CountryInfoCardWatchList";
import { Alert, AlertIcon } from "@chakra-ui/react";

import "react-datepicker/dist/react-datepicker.css";
import { WeatherAPIGetLocations } from "../../APIHelper/WeatherAPI";
import WeatherView from "./Components/WeatherView";
import DownloadReport from "./Components/DownloadReport";

const WeatherTrendView = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [currentCountryList, setCurrentCountryList] = useState([]);
  const [countryMapping, setCountryMapping] = useState({});
  const [selectedAddressHash, setSelectedAddressHash] = useState();
  const [selectedAddress, setSelectedAddress] = useState();

  const addCountry = (country: CountrySearchResult) => {
    if (!(country.common in countryMapping)) {
      countryMapping[country.common] = country;
      setCountryMapping(countryMapping);
      setCurrentCountryList(Object.values(countryMapping));
    }
  };

  const deleteCountry = (country: CountrySearchResult) => {
    if (country.common in countryMapping) {
      delete countryMapping[country.common];
      setCountryMapping(countryMapping);
      setCurrentCountryList(Object.values(countryMapping));
    }
  };

  const fetchWeatherDataForSelectedCity = (
    addressHash: string,
    address: string
  ) => {
    // This method shall be used to request weather data for the selected city
    setSelectedAddressHash(addressHash);
    setSelectedAddress(address);
    // WeatherAPIGetUpdate(addressHash, (response => {console.log(response)}), (error => {console.log(error)}))
  };

  const loadAllLocations = () => {
    WeatherAPIGetLocations(
      (response: any[]) => {
        setCurrentCountryList(response);
      },
      (error: any) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    loadAllLocations();
  }, []);
  useEffect(() => {
    if (!openDrawer) {
      loadAllLocations();
    }
  }, [openDrawer]);

  return (
    <>
      <AddLocationDrawer
        drawerState={openDrawer}
        alterDrawerState={setOpenDrawer}
        addCountry={addCountry}
        deleteCountry={deleteCountry}
      />
      <SimpleGrid columns={{ sm: 1, md: 4 }} spacing={4} padding={3}>
        <GridItem
          colSpan={{ sm: 1, md: 1 }}
          style={{ backgroundColor: "lightgreen", padding: "10px" }}
        >
          <Center>
            <Heading>Weather Trend.</Heading>
          </Center>
          <br />
          <Button onClick={() => setOpenDrawer(!openDrawer)}>
            + Add New City
          </Button>
          <br />
          <br />
          <b>Watchlisted Cities</b>
          {currentCountryList.map((element, index) => {
            return (
              <CountryInfoCardWatchList
                key={index}
                country={element}
                selectionHandler={fetchWeatherDataForSelectedCity}
                currentSelectedCountry={selectedAddressHash}
              />
            );
          })}
          <br />
        </GridItem>
        <GridItem colSpan={{ sm: 1, md: 3 }} style={{ padding: "10px" }}>
          {selectedAddressHash ? (
            <>
              <DownloadReport
                cityName={selectedAddress}
                hash={selectedAddressHash}
              />
              <WeatherView addressHash={selectedAddressHash} />
            </>
          ) : (
            <>
              <br />
              <Alert status="info">
                Please select any watchlisted city from the left panel
              </Alert>
            </>
          )}
        </GridItem>
      </SimpleGrid>
    </>
  );
};

export default WeatherTrendView;
