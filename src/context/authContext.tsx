import { createContext, ReactNode, useCallback, useState } from "react";
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
    hpone: string,
    address: string
}

export interface Login{
    email: string,
    password: string
}

interface AuthContextData {
    user: User | Ong | null,
    signIn: (email: string, password: string) => void,
    signOut?: () => void
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

    // console.log(user)

    const signIn = useCallback(async (email: string, password: string) => {
        const response = await api.post('/login/ong', {email, password})
        setUser(response.data)
    }, [user])

    return(
        <AuthContext.Provider value={{user, signIn}}>
            {children}
        </AuthContext.Provider>
    )
}