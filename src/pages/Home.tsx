import { Box, Checkbox, IconButton, Input, Text } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons'
import { FC, useCallback, useState } from "react";
import Modal from './../components/Modal';
import api from "../services/api";
import { AxiosRequestConfig } from "axios";

interface Animal {
    specie: string,
    ong: any,
    user?: any
}

const Home:FC = () => {
    const [modal, setModal] = useState<boolean>(false)
    const [clinicalCase, setClinicalCase] = useState<boolean>(false)
    const [species, setSpecies] = useState<string>()
    const [value, setValue] = useState<string>()

    const sendAninal = useCallback(async () => {
        const data = {
            specie: species,
            // clinicalCase,
            // value
            ong:{
                id: 1
            }
        } as Animal

        const response = await api.post('/animals',data)

        console.log(response.data)

        setModal(false)
    }, [clinicalCase, species, value, false])
    return(
        <Box
            w="100vw"
            h="100vh"
            background={"#f0f0f0"}
            display={"flex"}
            flexDirection={"column"}

        >
            <Box 
                as={"header"} 
                w="100%" 
                h="60px" 
                background={"#00B393"}
                display={"flex"}
                alignItems="center"
                padding={"30px"}
                justifyContent={"space-between"}
            >
                <Text fontSize={"3xl"} fontWeight={"bold"} color={"#fff"}>olá, caio</Text>
                
                <IconButton aria-label='Add to friends' icon={<AddIcon />} onClick={()=>setModal(true)}/>
            </Box>

            <Box
                h={"calc(100% - 60px)"}
                w="100vw"
                display={"flex"}
            >

            </Box>

            {modal &&
                <Modal onClose={() => setModal(false)} isOpen={modal} textButton={"Criar"} title={"Cadastrar animal"} functionButton={sendAninal}>
                    <Input placeholder="Especie" marginBottom={4} value={species} onChange={(e) => {setSpecies(e.target.value)}}/>
                    <Checkbox checked={clinicalCase} onChange={(e) => setClinicalCase(e.target.checked)} marginBottom={4}>Caso Clinico</Checkbox>

                    {clinicalCase && 
                        <Input placeholder="Valor necessário" marginBottom={4} value={value} onChange={(e) => {setValue(e.target.value)}}/>
                    }
                </Modal>
            }
        </Box>
    )
}

export default Home