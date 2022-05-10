import { ChakraProvider, Text } from '@chakra-ui/react'
import Login from './pages/Login'

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Login/>
      </ChakraProvider>
    </div>
  )
}

export default App