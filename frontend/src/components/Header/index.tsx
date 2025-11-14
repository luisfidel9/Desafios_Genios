import { Link } from "react-router-dom"
import { SquareCheckBig } from "lucide-react"
import { useContext } from "react"
import { UserContext } from "../../context"


export default function Header(){
    const session = useContext(UserContext)
    function terminarSessao(){
        localStorage.removeItem("object")
        sessionStorage.removeItem("user_id")
        session?.setLogado(false)
    }
    return(
        <>
            <header className="flex items-center justify-between px-28 border-b-2 bg-white/80 w-full p-4 max-lg:px-4 max-md:px-4 sticky top-0 mb-7">
                <div className="flex items-center gap-1">
                    <SquareCheckBig className="text-sky-600 size-8"/>
                    <h1 className="font-semibold text-lg">TaskManager</h1>
                </div>
                <div className="flex gap-5 items-center">
                    <Link to="/dashboard" className="text-sky-600 hover:text-sky-600 font-medium">Dashboard</Link>

                    <Link to="#" className="text-gray-600  font-medium" onClick={()=>alert("De momento a área de perfil não está disponivel")}>Perfil</Link>

                    <button className="rounded-xl border py-1 px-3 hover:text-sky-600 hover:border-sky-600" onClick={terminarSessao}>Sair</button>
                </div>
            </header>
        </>
    )
}