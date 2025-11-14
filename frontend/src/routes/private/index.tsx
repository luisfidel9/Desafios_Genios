import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"

interface props{
    children:ReactNode
    logado:boolean
}
export default function PrivatePage({children, logado}:props){
    if(!logado){
        return <Navigate to="/" replace/>
    }
    return children
}