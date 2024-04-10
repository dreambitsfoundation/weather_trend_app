import { Box, Flex, Heading, Center } from "@chakra-ui/react"
import { useEffect, useState } from "react";
const CountryInfoCardWatchList = (props: SavedLocations) => {
    const [currentSelectionState, setCurrentSelectionState] = useState(false);

    const handleRemovalAction = () => {
        props.removalHandler(props.country)
    }

    const handleCountrySelection = () => {
        props.selectionHandler(props.country.hash)
        setCurrentCountryList(props.country.countryCode)
    }

    useEffect(() => {
        if(props.currentSelectedCountry == props.country.hash){
            setCurrentSelectionState(true);
        }else{
            setCurrentSelectionState(false);
        }
    })
    
    return (
        <Flex style={{margin: "5px", padding: "10px", cursor: "pointer", color: currentSelectionState ? "white": "black", "backgroundColor": currentSelectionState ? "green": "white"}} onClick={(event) => handleCountrySelection()}>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                <Center>
                    <Heading size='sm'>{props.country.address.toUpperCase()}</Heading>
                    <span>{props.address}</span>
                    <br/>
                    {/* <small style={{color: "red", cursor: "pointer"}} onClick={() => {handleRemovalAction()}}>Remove</small> */}
                </Center>
            </Flex>
        </Flex>
    )
}

export default CountryInfoCardWatchList;