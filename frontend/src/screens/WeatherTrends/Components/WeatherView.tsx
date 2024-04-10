import { Box, Card, CardHeader, CardBody, Stack, Heading, Text, StackDivider, Flex, Center } from "@chakra-ui/react"
import {useState, useEffect} from "react";
import { WeatherAPIGetUpdate } from "../../../APIHelper/WeatherAPI";

const WeatherView = (props: WeatherViewPropsInterface) => {
    const [averageTemp, setAverageTemp] = useState();
    const [weatherUpdates, setWeatherUpdates] = useState([]);

    const handleWeatherUpdateResponse = (data: WeeklyWeatherUpdate) => {
        // This method handles the response from weather update
        setAverageTemp(data.average_temp)
        setWeatherUpdates(data.updates)
    }

    const convertToHumanReadableDate = (epoch: number) => {
        var d = new Date(epoch*1000);
        return d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear() + " " +  d.toLocaleTimeString('en-US');
    }

    useEffect(() => {
        WeatherAPIGetUpdate(props.addressHash, (response => {handleWeatherUpdateResponse(response)}), (error => {cons}))
    }, [props.addressHash])

    return (
        <Box>
            <>
            <Card>

                <CardHeader>
                    <Heading size='md'>Showing results for: {weatherUpdates.length ? weatherUpdates[0].name + ", " + weatherUpdates[0].sys.country: "Loading..."}</Heading>
                    <br/>
                    <Heading size='md'>Average temperature: {averageTemp ? averageTemp.toFixed(2): "Loading..."}°C</Heading>
                </CardHeader>

                <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>
                    {weatherUpdates.length ? weatherUpdates.map((element, index) => {
                        return (
                            <Box>
                                <Flex>
                                    <Center>
                                        <img src={`https://openweathermap.org/img/wn/${element.weather[0].icon}.png`}/>
                                    </Center>
                                    <Center>
                                        {element.weather[0].main}
                                    </Center>
                                </Flex>
                                <Heading size='xs' textTransform='uppercase'>
                                    {element.main.temp}°C
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    {convertToHumanReadableDate(element.last_updated)}
                                </Text>
                            </Box>
                        )
                    }): "Choose a city to fetch report."}
                    
                    </Stack>
                </CardBody>
            </Card>
            </>
        </Box>
    )
}

export default WeatherView;