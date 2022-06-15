import { Box, Grid, IconButton, Input, Text } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons'
import { useCallback, useEffect, useMemo, useState } from "react";
import Modal from './../components/Modal';
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { Ong, User } from "../context/authContext";
import {FiLogOut} from 'react-icons/fi'
import CardAnimal from "../components/CardAnimal";

// FiLogOut
export interface Animal {
    id?: number,
    specie: string,
    ong: Ong,
    user?: User
}

const Home = () => {
    const { user, signOut, typeUser } = useAuth()
    
    const [modal, setModal] = useState<boolean>(false)
    const [clinicalCase, setClinicalCase] = useState<boolean>(false)
    const [species, setSpecies] = useState<string>()
    const [value, setValue] = useState<string>()

    const [animals, setAnimals] = useState<Animal[]>([])
    
    const logedUser = user as User | Ong

    const isOng:boolean = useMemo(() => {
        return typeUser === 'ong' ? true : false
    }, [])

    const sendAninal = useCallback(async () => {
        const data = {
            specie: species,
            ong:{
                id: logedUser.id
            }
        } as Animal

        try {
            await api.post('/animals',data)
        } catch (error) {
            alert(error)
        }

        setModal(false)
    }, [clinicalCase, species, value, false])

    useEffect(()=>{
        api.get('animals').then(response => {
            setAnimals(response.data.reverse())
        })
    },[modal])

    return(
        <Box
            w="100vw"
            h="100vh"   
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
                <Text fontSize={"3xl"} fontWeight={"bold"} color={"#fff"}>
                    {logedUser.nome}
                </Text>
                
                <Box>
                    {isOng && 
                        <IconButton aria-label='Add to friends' icon={<AddIcon />} onClick={()=>setModal(true)} marginRight={2}/>
                    }
                    <IconButton aria-label='Add to friends' icon={<FiLogOut/>} onClick={signOut}/>
                </Box>
            </Box>

            <Box
                h={"100%"}
                w="100vw"
                display={"flex"}
                padding={10}
            >
                <Grid 
                    templateColumns='repeat(3, 1fr)' 
                    gap={6} 
                    w="100vw"
                >
                    {animals.map(animal => (
                        <CardAnimal animal={animal}/>
                    ))}
                </Grid>
            </Box>

            {modal &&
                <Modal onClose={() => setModal(false)} isOpen={modal} textButton={"Criar"} title={"Cadastrar animal"} functionButton={sendAninal}>
                    <Input placeholder="Especie" marginBottom={4} value={species} onChange={(e) => {setSpecies(e.target.value)}}/>
                </Modal>
            }
        </Box>
    )
}

export default Home