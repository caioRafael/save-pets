import { Button } from "@chakra-ui/button";
import { useBoolean } from "@chakra-ui/hooks";
import { Box, GridItem, Text } from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/tag";
import { useCallback, useMemo } from "react";
import { useAuth } from "../hooks/useAuth";
import { Animal } from "../pages/Home";
import api from "../services/api";

interface CardAnimalProps{
    animal: Animal
}

const CardAnimal= (props: CardAnimalProps) => {
    const {animal} = props

    const { user, typeUser } = useAuth()
    const [load, setLoad] = useBoolean(false)

    const isOng:boolean = useMemo(() => {
        return typeUser === 'ong' ? true : false
    }, [])

    const handlerUpdateAnimal = useCallback(async() => {
        setLoad.on()
        try {
            api.put('animals',{
                user: user,
                ...animal
            })
        } catch (error) {
            alert(error)
        }
        setLoad.off()
    }, [props.animal])
    return(
        <GridItem 
            key={animal.id} 
            w='100%' maxh='300' 
            bg='#C4C4C4'
            padding='20px'
            borderRadius={10}
        >
            <Text fontSize={"2xl"} fontWeight={"bold"}>
                {animal.specie}
            </Text>
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
            {!isOng && !animal.user &&
                <Button 
                    colorScheme='teal' 
                    alignSelf={'center'}
                    isLoading={load}    
                    onClick={handlerUpdateAnimal}
                >
                    Adotar
                </Button>
            }
            {isOng && 
                <Button
                    colorScheme='red' 
                    alignSelf={'center'}
                    isLoading={load}    
                    onClick={() => {}}
                >
                    Caso clinico
                </Button>
            }
        </GridItem>
    )
}

export default CardAnimal