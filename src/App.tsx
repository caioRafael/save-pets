import { ChakraProvider } from '@chakra-ui/react'
import { useAuth } from './hooks/useAuth'
import Home from './pages/Home'
import Login from './pages/Login'

function App() {
  const {user} = useAuth()
  return (
    <div className="App">
      <ChakraProvider>
          {user ? <Home/> : <Login/>}
      </ChakraProvider>
    </div>
  )
}

export default App
