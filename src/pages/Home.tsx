import { Box, Checkbox, Grid, GridItem, IconButton, Input, Tag, Text } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons'
import { FC, useCallback, useEffect, useState } from "react";
import Modal from './../components/Modal';
import api from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { Ong, User } from "../context/authContext";

interface Animal {
    id?: number,
    specie: string,
    ong: any,
    user?: any
}

const Home:FC = () => {
    const { user } = useAuth()

    
    const [modal, setModal] = useState<boolean>(false)
    const [clinicalCase, setClinicalCase] = useState<boolean>(false)
    const [species, setSpecies] = useState<string>()
    const [value, setValue] = useState<string>()

    const [animals, setAnimals] = useState<Animal[]>([])
    
    const logedUser = user as User | Ong

    const sendAninal = useCallback(async () => {
        const data = {
            specie: species,
            ong:{
                id: logedUser.id
            }
        } as Animal

        const response = await api.post('/animals',data)

        setModal(false)
    }, [clinicalCase, species, value, false])

    useEffect(()=>{
        api.get('ongs/animals/5').then(response => {
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
                
                <IconButton aria-label='Add to friends' icon={<AddIcon />} onClick={()=>setModal(true)}/>
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
                        <GridItem 
                            key={animal.id} 
                            w='100%' h='250' 
                            bg='#C4C4C4'
                            padding='20px'
                            borderRadius={10}
                        >
                            <Text fontSize={"2xl"} fontWeight={"bold"}>{animal.specie}</Text>
                            {!animal.user && (
                                <Tag colorScheme={'teal'}>Disponivel para Adoção</Tag>
                            )}
                            <Box mt='5'>
                                <Text>Ong: {animal.ong.nome}</Text>
                                <Text>Contato:</Text>
                                <Box ml='5'>
                                    <Text>telefone: {animal.ong.phone}</Text>
                                    <Text>Email: {animal.ong.email}</Text>
                                    <Text>Endereço: {animal.ong.address}</Text>
                                </Box>
                            </Box>
                        </GridItem>
                    ))}
                </Grid>
            </Box>

            {modal &&
                <Modal onClose={() => setModal(false)} isOpen={modal} textButton={"Criar"} title={"Cadastrar animal"} functionButton={sendAninal}>
                    <Input placeholder="Especie" marginBottom={4} value={species} onChange={(e) => {setSpecies(e.target.value)}}/>
                    {/* <Checkbox checked={clinicalCase} onChange={(e) => setClinicalCase(e.target.checked)} marginBottom={4}>Caso Clinico</Checkbox>

                    {clinicalCase && 
                        <Input placeholder="Valor necessário" marginBottom={4} value={value} onChange={(e) => {setValue(e.target.value)}}/>
                    } */}
                </Modal>
            }
        </Box>
    )
}

export default Home