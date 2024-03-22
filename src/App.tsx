import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import WeatherTrendView from './screens/WeatherTrends/WeatherTrends';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path='' element={<WeatherTrendView/>}/>
        </Routes>
      </Router>
    </ChakraProvider>
  )
}

export default App
