import { FC } from "react"
import { Box, Button, Input, Stack, Text } from "@chakra-ui/react"

const Login:FC = () => {
    return (
        <Box 
            w="100vw" 
            h="100vh" 
            display={"flex"} 
            alignItems={"center"} 
            justifyContent={"center"}
            // background={"#00B393"}
            backgroundImage={"https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"}
        >
            <Box
                background={"#f2f2f2"} 
                w="400px" 
                h="400px" 
                borderRadius={10}
                padding={20}
                display={"flex"} 
                alignItems={"center"}
                flexDirection={"column"}
            >
                <Text fontSize={"4xl"} fontWeight={"bold"}>Login</Text>
                <Stack marginTop={30}>
                    <Input placeholder="E-mail" type={"email"}/>
                    <Input placeholder="Senha" type={"password"}/>
                    <Button colorScheme='teal' size='lg'>
                        Login
                    </Button>
                </Stack>
            </Box>
        </Box>
    )
}

export default Login