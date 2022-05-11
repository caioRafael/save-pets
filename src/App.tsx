import { ChakraProvider } from '@chakra-ui/react'
import Routes from './routes'

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Routes/>
      </ChakraProvider>
    </div>
  )
}

export default App
