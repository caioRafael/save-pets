import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from './context/authContext'
import { useAuth } from './hooks/useAuth'
import Home from './pages/Home'
import Login from './pages/Login'
import Routes from './routes'

function App() {
  const {user} = useAuth()
  console.log(user)
  return (
    <div className="App">
      <ChakraProvider>
          {user ? <Home/> : <Login/>}
      </ChakraProvider>
    </div>
  )
}

export default App
