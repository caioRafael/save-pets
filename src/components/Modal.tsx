import { Button, Modal as ChakraModal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

export interface ModalPros{
    isOpen: boolean
    onClose: () => void
    children?: ReactNode
    textButton?: string
    functionButton?: () => void
    title?: string,
    isLoading?: boolean
}

const Modal:FC<ModalPros> = (props) => {
    return(
        <ChakraModal onClose={props.onClose} isOpen={props.isOpen}>
            <ModalOverlay />
                <ModalContent>
                <ModalHeader>{props.title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {props.children}
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='red' mr={3} onClick={props.onClose}>
                    Close
                    </Button>
                    <Button  
                        colorScheme='blue' 
                        onClick={props.functionButton}
                        isLoading={props.isLoading}
                    >{props.textButton}</Button>
                </ModalFooter>
            </ModalContent>
        </ChakraModal>
    )
}

export default Modal