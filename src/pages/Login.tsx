import { FC, useCallback, useState } from "react"
import { Box, Button, Input, Stack, Text, Link, useBoolean } from "@chakra-ui/react"
import { useHistory } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import CreateUserModal from "../components/CreateUserModal"

const Login:FC = () => {
    const { signIn } = useAuth()
    const history = useHistory()
    const [modal, setModal] = useBoolean(false)

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const goToHome = useCallback(async () => {
        // history.push('/home')
        await signIn(email, password)
    }, [email, password])
    return (
        <Box
            display={"flex"}
            flexDirection={"row"}
        >
            <Box 
                w="70vw" 
                h="100vh" 
                display={"flex"} 
                alignItems={"center"} 
                justifyContent={"center"}
                backgroundImage={"https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"}
                backgroundSize={"cover"}
                backgroundRepeat="no-repeat"
            >
            </Box>
            <Box
                h="100vh" 
                w="30vw"
                display={"flex"} 
                alignItems={"center"} 
                justifyContent={"center"}
                background={"#00B393"}
            >
                <Box
                    background={"#f2f2f2"} 
                    w="90%" 
                    h="400px" 
                    borderRadius={10}
                    padding={20}
                    display={"flex"} 
                    alignItems={"center"}
                    flexDirection={"column"}
                >
                    <Text fontSize={"4xl"} fontWeight={"bold"}>Login</Text>
                    <Stack marginTop={30} w="85%">
                        <Input 
                            placeholder="E-mail" 
                            type={"email"} 
                            borderColor={"#00B393"}
                            value={email}
                            onChange={(e) => {setEmail(e.target.value)}}
                        />
                        <Input 
                            placeholder="Senha" 
                            type={"password"} 
                            borderColor={"#00B393"}
                            value={password}
                            onChange={(e) => {setPassword(e.target.value)}}
                        />
                        <Button colorScheme='teal' size='lg' onClick={goToHome}>
                            Login
                        </Button>
                        <Link
                            to="" 
                            alignSelf={"center"} 
                            onClick={setModal.on}
                        >
                            Criar Conta
                        </Link>
                    </Stack>
                </Box>
            </Box>

            {modal && 
                <CreateUserModal
                    isOpen={modal}
                    onClose={setModal.off}
                />            
            }
        </Box>
    )
}

export default Login