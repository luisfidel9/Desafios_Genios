import type { ReactNode } from "react"
import { Navigate } from "react-router-dom"

interface props{
    children:ReactNode
    logado:boolean
}
export default function PublicPage({children, logado}:props){
    if(logado){
        return <Navigate to="/dashboard" replace/>
    }
    return children
}