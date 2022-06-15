import { FC, useCallback, useState } from "react"
import { Box, Button, Input, Stack, Text, Link, useBoolean } from "@chakra-ui/react"
import { useHistory } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import CreateUserModal from "../components/CreateUserModal"
import { typeForm } from "../context/authContext"

const Login = () => {
    const { signIn, load } = useAuth()
    const history = useHistory()
    const [modal, setModal] = useBoolean(false)

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [form, setForm] = useState<typeForm>('user')

    const goToHome = useCallback(async () => {
        await signIn(email, password, form)
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
                    h="500px" 
                    borderRadius={10}
                    padding={20}
                    display={"flex"} 
                    alignItems={"center"}
                    flexDirection={"column"}
                >
                    <Text fontSize={"4xl"} fontWeight={"bold"}>Login</Text>
                    <Stack marginTop={30} w="85%">
                    <Box>
                        <Button 
                            onClick={()=>setForm("user")} 
                            colorScheme={ form==='user' ? 'blue' : 'gray' }
                            borderRadius={1}
                            marginRight={1}
                        >Usuário</Button>
                        <Button 
                            onClick={()=>setForm("ong")} 
                            colorScheme={ form==='ong' ? 'blue' : 'gray' }
                            borderRadius={1}
                        >Ong</Button>
                    </Box>
                        <Input 
                            placeholder="E-mail" 
                            type={"email"} 
                            borderColor={"#00B393"}
                            value={email}
                            onChange={(e: any) => {setEmail(e.target.value)}}
                        />
                        <Input 
                            placeholder="Senha" 
                            type={"password"} 
                            borderColor={"#00B393"}
                            value={password}
                            onChange={(e: any) => {setPassword(e.target.value)}}
                        />
                        <Button colorScheme='teal' size='lg' onClick={goToHome} isLoading={load}>
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