import { Button } from "@chakra-ui/button";
import { useBoolean } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import { FC, useCallback, useState } from "react";
import { typeForm } from "../context/authContext";
import api from "../services/api";
import Modal, { ModalPros } from "./Modal";

interface CreateUserModalProps extends ModalPros{}

const CreateUserModal = (props: CreateUserModalProps) => {
    const [nome, setNome] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [address, setAddress] = useState<string>("")


    const [form, setForm] = useState<typeForm>('user')

    const [load, setLoad] = useBoolean(false)

    const onSubmit = useCallback(async ()=>{
        setLoad.on()
        if(form === 'ong'){
            await api.post('ongs',{
                nome,
                email,
                phone,
                password,
                address
            })
        }else{
            const response = await api.post('users', {
                nome,
                email,
                phone,
                password,
            })
        }
        setLoad.off()
        props.onClose()
    },[nome, email, phone, form, password, address])
    return(
        <Modal
            isOpen={props.isOpen}
            onClose={props.onClose}
            functionButton={onSubmit}
            title={"Criar Usuário"}
            textButton={"Criar"}
            isLoading={load}
        >
            <Box>
                <Button 
                    onClick={()=>setForm("user")} 
                    margin={4}
                    colorScheme={ form==='user' ? 'blue' : 'gray' }
                >Usuário</Button>
                <Button 
                    onClick={()=>setForm("ong")} 
                    margin={4}
                    colorScheme={ form==='ong' ? 'blue' : 'gray' }
                >Ong</Button>
            </Box>

            {form === 'user' ?
                <Box
                    marginTop={4}
                >
                    <Input 
                        placeholder="Nome" 
                        type={"text"} 
                        borderColor={"#00B393"}
                        value={nome}
                        onChange={(e: any) => {setNome(e.target.value)}}
                        marginTop={1}
                    />

                    <Input 
                        placeholder="-Email" 
                        type={"email"} 
                        borderColor={"#00B393"}
                        value={email}
                        onChange={(e: any) => {setEmail(e.target.value)}}
                        marginTop={1}
                    />

                    <Input 
                        placeholder="Telefone" 
                        type={"text"} 
                        borderColor={"#00B393"}
                        value={phone}
                        onChange={(e: any) => {setPhone(e.target.value)}}
                        marginTop={1}
                    />

                    <Input 
                        placeholder="Senha" 
                        type={"password"} 
                        borderColor={"#00B393"}
                        value={password}
                        onChange={(e: any) => {setPassword(e.target.value)}}
                        marginTop={1}
                    />
                </Box>
                :
                <Box
                    marginTop={4}
                >
                    <Input 
                        placeholder="Nome" 
                        type={"text"} 
                        borderColor={"#00B393"}
                        value={nome}
                        onChange={(e: any) => {setNome(e.target.value)}}
                        marginTop={1}
                    />

                    <Input 
                        placeholder="-Email" 
                        type={"email"} 
                        borderColor={"#00B393"}
                        value={email}
                        onChange={(e: any) => {setEmail(e.target.value)}}
                        marginTop={1}
                    />

                    <Input 
                        placeholder="Telefone" 
                        type={"text"} 
                        borderColor={"#00B393"}
                        value={phone}
                        onChange={(e: any) => {setPhone(e.target.value)}}
                        marginTop={1}
                    />

                    <Input 
                        placeholder="Senha" 
                        type={"password"} 
                        borderColor={"#00B393"}
                        value={password}
                        onChange={(e: any) => {setPassword(e.target.value)}}
                        marginTop={1}
                    />

                    <Input 
                        placeholder="Endereço" 
                        type={"text"} 
                        borderColor={"#00B393"}
                        value={address}
                        onChange={(e: any) => {setAddress(e.target.value)}}
                        marginTop={1}
                    />
                </Box>
            }

        </Modal>
    )
} 

export default CreateUserModal