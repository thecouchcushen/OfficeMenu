//import { useState } from 'react'
import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import BiWeeklyCalendar from './BiweeklyCalendar'
//import PricingCalculator from './PricingCalculator'

function App() {

  return (
    <ChakraProvider>
      <h1>OfficeMenu</h1>
      <BiWeeklyCalendar />
    </ChakraProvider>
  )
}

export default App
