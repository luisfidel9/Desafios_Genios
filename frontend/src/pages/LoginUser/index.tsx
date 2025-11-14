import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import api from "../../services/api"
import { jwtDecode } from "jwt-decode"
import { UserContext } from "../../context"

export default function LoginUser(){
    const [email, setEmail] = useState<string>()
    const [senha, setSenha] = useState<string>()
    const session = useContext(UserContext)
    async function logar(e: any){
        e.preventDefault()
        await api.post("/session",{
            email:email,
            senha:senha
        }).then(res=>{
            localStorage.setItem("object",JSON.stringify(res.data.token))
            let token : any = localStorage.getItem("object") || []
            let decoded = jwtDecode(token)
            sessionStorage.setItem("user_id", JSON.stringify(decoded))
            alert("Logado com sucesso!!!")
            session?.setLogado(true)
        }).catch(()=>{
            if(!email || !senha){
                alert("Campos vazios")
                return
            }
            alert("Erro ao logar na aplicação!!!")
        })
    }
    return(
        <>
            <div className="w-full flex justify-center mt-40">
                <form className="w-fit flex-col p-5 rounded-xl border-solid border shadow-md shadow-gray-300 bg-white sm:mx-3" onSubmit={e=>logar(e)}>
                    <div className="text-center mb-5">
                        <label className="">Entrar na sua conta</label>
                        <p className="text-gray-500">Entre com suas credenciais para acessar suas tarefas</p>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="Email" className="fon">E-mail</label>
                        <input type="text" id="Email" placeholder="seu@email.com" className="sm:w-96 bg-gray-200 p-2 pl-3 rounded-lg text-gray-400 mb-3 flex text-justify" onChange={e=>setEmail(e.target.value)}/>
                        <label htmlFor="Senha" className="fon">Senha</label>
                        <input type="text" id="Senha" placeholder="........." className="sm:w-96 bg-gray-200 p-2 pl-3 rounded-lg text-gray-400 mb-3 flex text-justify"
                        onChange={e=>setSenha(e.target.value)}/>
                    </div>
                    <footer className="flex flex-col items-center">
                        <button type="submit" className="w-full bg-blue-500 text-white text-center p-2 rounded-lg mb-5 font-semibold">Entrar</button>
                        <p className="text-gray-600">Não tem uma conta? <Link to="/cadastrar">Cadastre-se</Link></p>
                    </footer>
                </form>
            </div>
        </>
    )
}