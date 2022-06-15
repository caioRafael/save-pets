import { useBoolean } from "@chakra-ui/hooks";
import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { Animal } from "../pages/Home";
import api from "../services/api";

export interface User {
    id: number,
    nome: string,
    phone: string,
    email: string
}

export interface Ong {
    id: number,
    nome: string,
    email: string,
    phone: string,
    address: string
}

export interface Login{
    email: string,
    password: string
}

export interface ClinicalCase{
    id?: number,
    targetValue: number,
    amountCollected: number,
    animal: Animal,
    ong: Ong
}

export type typeForm = 'ong' | 'user' | null

interface AuthContextData {
    user: User | Ong | null,
    signIn: (email: string, password: string, type: typeForm) => void,
    signOut?: () => void
    load: boolean
    typeUser: typeForm
}

export const AuthContext = createContext({} as AuthContextData)

interface AuthProvider {
    children: ReactNode;
}

interface AuthResponse {
    user: User | Ong
}



export function  AuthProvider({children}: AuthProvider){
    const [user, setUser] = useState<User | Ong | null>(null)
    const [typeUser, setTypeUser] = useState<typeForm>(null)

    const [load, setLoad] = useBoolean(false)

    // console.log(user)

    useEffect(()=>{
        const userLoged = localStorage.getItem('@pets:user')
        const type = localStorage.getItem('@pets:type')
        if(userLoged){
            setUser(JSON.parse(userLoged))
            setTypeUser(type as typeForm)
        }
    },[])

    const signIn = useCallback(async (email: string, password: string, type: typeForm) => {
        setLoad.on()
        try {
            if(type === "ong") {
                const response = await api.post('/login/ong', {email, password})
                setUser(response.data as Ong)
                setTypeUser('ong')
                localStorage.setItem('@pets:user', JSON.stringify(response.data))
                localStorage.setItem('@pets:type', 'ong')
            }else{
                const response = await api.post('/login/user', {email, password})
                setUser(response.data as User)
                setTypeUser('user')
                localStorage.setItem('@pets:user', JSON.stringify(response.data))
                localStorage.setItem('@pets:type', 'user')
            }
        } catch (error) {
            alert(error)
        }
        
        setLoad.off()
    }, [user])

    const signOut = useCallback(() => {
        setUser(null)
        setTypeUser(null)
        localStorage.clear()
    }, [user])

    return(
        <AuthContext.Provider value={{user, signIn, load, signOut, typeUser}}>
            {children}
        </AuthContext.Provider>
    )
}