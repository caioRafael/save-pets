import { Button } from "@chakra-ui/button";
import { useBoolean } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, GridItem, Text } from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/tag";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ClinicalCase } from "../context/authContext";
import { useAuth } from "../hooks/useAuth";
import { Animal } from "../pages/Home";
import api from "../services/api";
import Modal from "./Modal";

interface CardAnimalProps{
    animal: Animal
}

const CardAnimal= (props: CardAnimalProps) => {
    const {animal} = props

    const { user, typeUser } = useAuth()
    const [load, setLoad] = useBoolean(false)
    const [clinicalCaseModal, setClinicalCaseModal] = useBoolean()
    const [updateClinicalCaseModal, setUpdateClinicalCaseModal] = useBoolean()

    const [targetValue, setTargetValue] = useState<number>(0)
    const [amountCollected,setAmountCollected] = useState<number>(0)
    const [animalCard, setAnimalCard] = useState<Animal>(animal)
    const [clinicalCase, setClinicalCase] = useState<ClinicalCase[]>([])

    const isOng:boolean = useMemo(() => {
        return typeUser === 'ong' ? true : false
    }, [])

    useEffect(()=>{
        api.get(`/animals/clinical-cases/${animal.id}`).then(response => {
            setClinicalCase(response.data)
        }).catch(error => {
            console.log(error)
            setClinicalCase([])
        })
    },[updateClinicalCaseModal])

    const handlerUpdateAnimal = useCallback(async() => {
        setLoad.on()
        const data = {
            ...animal,
            user: {
                id: user?.id
            },
        }
        try {
            const response = await api.put('/animals',data)
            setAnimalCard(response.data)
        } catch (error) {
            alert(error)
        }
        setLoad.off()
    }, [animal])

    const createClinicalCase = useCallback(async() => {
        setLoad.on()
        const data = {
            targetValue, 
            amountCollected: 0,
            animal,
            ong: user
        }
        try {
            const response = await api.post('/clinical-cases',data)
        } catch (error) {
            alert(error)
        }
        setLoad.off()
        setClinicalCaseModal.off()
    }, [targetValue])

    const helpClinicalCase = useCallback(async()=>{
        setLoad.on()
        const data = {
            ...clinicalCase[0], 
            amountCollected: clinicalCase[0].amountCollected+parseInt(amountCollected+''),
        }
        try {
            await api.put('/clinical-cases',data)
        } catch (error) {
            alert(error)
        }
        setLoad.off()
        setUpdateClinicalCaseModal.off()
    },[amountCollected])

    if (!animalCard.user || (animal.ong.id === user?.id && typeUser === 'ong')){
        return(
            <GridItem 
                w='100%' maxh='300' 
                bg='#C4C4C4'
                padding='20px'
                borderRadius={10}
            >
                <Text fontSize={"2xl"} fontWeight={"bold"}>
                    {animalCard.specie}
                </Text>
                {!animalCard.user && (
                    <Tag colorScheme={'teal'}>Disponivel para Adoção</Tag>
                )}
                { clinicalCase.length > 0 && 
                    <Tag colorScheme={'red'}>Caso clinico</Tag>
                }
                <Box mt='5'>
                    <Text>Ong: {animalCard.ong.nome}</Text>
                    <Text>Contato:</Text>
                    <Box ml='5'>
                        <Text>telefone: {animalCard.ong.phone}</Text>
                        <Text>Email: {animalCard.ong.email}</Text>
                        <Text>Endereço: {animalCard.ong.address}</Text>
                    </Box>
                    {clinicalCase.length > 0 && 
                        <>
                            <Text>Caso clinico:</Text>

                            <Box ml='5'>
                                <Text>Valor total: R${clinicalCase[0].targetValue}</Text>
                                <Text>Calor arrecadado: R${clinicalCase[0].amountCollected}</Text>
                            </Box>
                        </>
                    }
                </Box>
                <Box marginTop={2}>
                    {!isOng && !animalCard.user &&
                        <Button 
                            colorScheme='teal' 
                            alignSelf={'center'}
                            isLoading={load}    
                            onClick={() => handlerUpdateAnimal()}
                        >
                            Adotar
                        </Button>
                    }
                    {!isOng && clinicalCase.length > 0 && 
                        <Button 
                            colorScheme='red' 
                            alignSelf={'center'}
                            isLoading={load}    
                            onClick={setUpdateClinicalCaseModal.on}
                            margin={1}
                        >
                            Doar
                        </Button>
                    }
                </Box>
                {isOng && clinicalCase.length === 0 &&
                    <Button
                        colorScheme='red' 
                        alignSelf={'center'}
                        isLoading={load}    
                        onClick={setClinicalCaseModal.on}
                    >
                        Caso clinico
                    </Button>
                }
                {clinicalCaseModal && isOng && 
                    <Modal
                        isOpen={clinicalCaseModal}
                        onClose={setClinicalCaseModal.off}
                        title={"Cadastrar caso clinico"}
                        textButton="Criar"
                        functionButton={createClinicalCase}
                        isLoading={load}
                    >
                        <Input
                            placeholder="Valor necessario" 
                            type={"number"} 
                            borderColor={"#00B393"}
                            value={targetValue}
                            onChange={(e: any) => {setTargetValue(e.target.value)}}
                        />
                    </Modal> 
                }
                {updateClinicalCaseModal && !isOng && 
                    <Modal
                        isOpen={updateClinicalCaseModal}
                        onClose={setUpdateClinicalCaseModal.off}
                        title={"Ajudar animal"}
                        textButton="Doar"
                        functionButton={helpClinicalCase}
                        isLoading={load}
                    >
                        <Input
                            placeholder="Doar valor" 
                            type={"number"} 
                            borderColor={"#00B393"}
                            value={amountCollected}
                            onChange={(e: any) => {setAmountCollected(e.target.value)}}
                        />
                    </Modal> 
                }
            </GridItem>
        )
    }else{
        return <></>
    }

}

export default CardAnimal