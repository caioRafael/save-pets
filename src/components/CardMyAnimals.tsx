import { Box, GridItem, Text } from "@chakra-ui/layout";
import { useAuth } from "../hooks/useAuth";
import { Animal } from "../pages/Home";
interface CardMyAnimalProps{
    animal: Animal
}

const CardMyAnimals = (props: CardMyAnimalProps) => {
    const {animal} = props

    return(
        <GridItem 
            w='100%' maxh='300' 
            bg='#C4C4C4'
            padding='20px'
            borderRadius={10}
        >
            <Text fontSize={"2xl"} fontWeight={"bold"}>
                {animal.specie}
            </Text>
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
    )

}

export default CardMyAnimals