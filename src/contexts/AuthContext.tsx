import { createContext, ReactNode, useState } from "react";
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import {api }from '../services/apiClient'

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>;
}

type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    name: string;
    lastname: string;
    email: string;
    password: string;
}

type UserProps = {
    id: string;
    name: string;
    lastname: string;
    email: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut(){
    try{
        destroyCookie(undefined, '@meuplanner.Token');
        Router.push('/login')
    }catch{
        console.log('error')
    }
}


export function AuthProvider({children}: AuthProviderProps){
    const [user, setUser] = useState<UserProps>();
    const isAuthenticated = !!user;

    async function signIn({email, password}: SignInProps){
        try{
            const response = await api.post('/session',{
                email, password
            })

            const{id, name, lastname, token} = response.data;

            setCookie(undefined, '@meuplanner.token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path: "/"
            } )

            setUser({
                id, name, lastname, email
            })

            api.defaults.headers['Authorization'] = `Bearer ${token}`

            Router.push('/auth/home')
        }catch(err){
            console.log("Erro ao logar usuário", err);
        }
    }

    async function signUp({name, lastname, email, password}: SignUpProps){
        try{
            const response = await api.post('/user',{
                name, lastname, email, password
            })

            console.log('cadastro concluído');

            Router.push('/login');

        }catch(err){
            console.log("Erro ao cadastrar usuário", err);
        }
    }

    return(
        <AuthContext.Provider value = {{user, isAuthenticated, signIn, signOut, signUp}}>
            {children}
        </AuthContext.Provider>
    )
}