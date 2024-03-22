import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, useDisclosure } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { CountrySearchAPI } from "../../../APIHelper/CountrySearchAPI"
import CountryInfoCard from "./CountryInfoCard"

const AddLocationDrawer = (props: LocationDrawerInterface) => {
  const { onClose } = useDisclosure()
  const btnRef = useRef()
  const [searchKeyWord, setSearchKeyword] = useState("");
  const [countrySearchResults, setCountrySearchResults] = useState([]);

  const keyWordChangeHandler = (searchText: string) => {
    setSearchKeyword(searchText);
    CountrySearchAPI(searchText, (response: any[]) => {
        setCountrySearchResults(response)
    }, (error: any) => {console.log(error)})
  }

  const handleDrawerOnClose = () => {
    onClose();
    props.alterDrawerState(false);
    setCountrySearchResults([]);
    setSearchKeyword("")
  }

  const handleSelectionChangeHandler = (selected: boolean, country: CountrySearchResult) => {
    if (selected){
        props.addCountry(country)
    }else{
        props.deleteCountry(country)
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
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default AddLocationDrawer;