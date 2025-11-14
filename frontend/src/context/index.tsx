import React, { createContext, useState, type ReactNode } from "react";


interface UserContextType{
    logado:boolean 
    setLogado:React.Dispatch<React.SetStateAction<boolean>>
}

export const UserContext = createContext<UserContextType | null>(null)
interface props{
    children: ReactNode
}
export default function UserProvider({children}:props){
    let user = localStorage.getItem("object")
    const [logado, setLogado] = useState<boolean>(!!user)

    return(
        <UserContext.Provider value={{ logado, setLogado }}>
            {children}
        </UserContext.Provider>
    )
}