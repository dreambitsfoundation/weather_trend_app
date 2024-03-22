import { Box, Flex, Heading } from "@chakra-ui/react"
import { useEffect, useState } from "react";
const CountryInfoCardWatchList = (props: CountryInfoCardWatchlistInterface) => {
    const [currentSelectionState, setCurrentSelectionState] = useState(false);

    const handleRemovalAction = () => {
        props.removalHandler(props.country)
    }

    const handleCountrySelection = () => {
        props.selectionHandler(props.country.common)
    }

    useEffect(() => {
        if(props.currentSelectedCountry == props.country.common){
            setCurrentSelectionState(true);
        }else{
            setCurrentSelectionState(false);
        }
    })
    
    return (
        <Flex style={{marginBottom: "10px", padding: "10px", color: currentSelectionState ? "white": "black", "backgroundColor": currentSelectionState ? "green": "white"}} onClick={(event) => handleCountrySelection()}>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                <Box>
                    <Heading size='sm'>{props.country.common}</Heading>
                    <span>{props.country.official}</span>
                    <br/>
                    <small style={{color: "red", cursor: "pointer"}} onClick={() => {handleRemovalAction()}}>Remove</small>
                </Box>
            </Flex>
        </Flex>
    )
}

export default CountryInfoCardWatchList;