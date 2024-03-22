import { Select } from "@chakra-ui/react"

const CitySelection = (props: {cityOptions: string[], selectedCity: CallableFunction}) => {
    return (
        <Select placeholder='Select City' onChange={(event) => props.selectedCity(event.target.value)}>
            {props.cityOptions.map((element, index) => <option value={element} key={index}>{element}</option>)}
        </Select>
    )
}

export default CitySelection;