import {createContext} from "react"; 

export interface User{
    email: string;
    username: string; 
    name: string
}


export const userContext = createContext<User | undefined>(undefined);
