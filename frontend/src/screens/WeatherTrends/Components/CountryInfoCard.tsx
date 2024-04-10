import { Box, Flex, Heading } from "@chakra-ui/react"
import { useEffect, useState } from "react";

const CountryInfoCard = (props: CountryInfoCardInterface) => {
    const [currentSelectionState, setCurrentSelectionState] = useState(false);

    const handleSelectionStateChange = (selectionState: boolean) => {
        props.selectionHandler(selectionState, props.country)
        setCurrentSelectionState(selectionState)
    }

    useEffect(() => {
        if(props.selectedCountry === props.country.common){
            setCurrentSelectionState(true);
        }
    })
    
    return (
        <Flex style={{marginBottom: "10px", padding: "10px", color: currentSelectionState ? "white": "black", "backgroundColor": currentSelectionState ? "green": "white"}} onClick={(event) => handleSelectionStateChange(!currentSelectionState)}>
            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                <Box>
                    <Heading size='sm'>{props.country.common}</Heading>
                    <span>{props.country.official}</span>
                    <br/>
                    <small>{currentSelectionState ? "✔ Added to watchlist.": ""}</small>
                </Box>
            </Flex>
        </Flex>
    )
}

export default CountryInfoCard;