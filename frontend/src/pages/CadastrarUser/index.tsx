import { Link } from "react-router-dom"
import api from "../../services/api"
import { useState } from "react"

export default function CadastrarUser(){
    const [nome, setNome] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [senha, setSenha] = useState<string>()

    async function cadastrar(e:any){
        e.preventDefault()
        await api.post("/cadastrar/",{
            nome:nome,
            email:email,
            senha:senha
        }).then(()=>{
            
            alert("Cadastrado com sucesso")
            
        }).catch(()=>{
            alert("Erro ao cadastrar usuário")
        })
    }
    return(
        <>
            <div className="w-full flex justify-center  mt-40">
                <form className="w-fit flex-col p-5 rounded-xl border-solid border shadow-md shadow-gray-300 bg-white" onSubmit={e => cadastrar(e)}>
                    <div className="text-center mb-5">
                        <label>Criar nova conta</label>
                        <p className="text-gray-500">Preencha os dados para criar sua conta</p>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="Nome" className="fon">Nome</label>
                        <input type="text" id="Nome" placeholder="Seu nome completo" className="sm:w-96 bg-gray-200 p-2 pl-3 rounded-lg text-gray-400 mb-3 flex text-justify" onChange={e=> setNome(e.target.value)}/>
                        <label htmlFor="Email" className="fon">E-mail</label>
                        <input type="text" id="Email" placeholder="seu@email.com" className="sm:w-96 bg-gray-200 p-2 pl-3 rounded-lg text-gray-400 mb-3 flex text-justify" onChange={e=> setEmail(e.target.value)}/>
                        <label htmlFor="Senha" className="fon">Senha</label>
                        <input type="text" id="Senha" placeholder="........." className="ssm:w-96 bg-gray-200 p-2 pl-3 rounded-lg text-gray-400 mb-3 flex text-justify" onChange={e=> setSenha(e.target.value)}/>
                    </div>
                    <footer className="flex flex-col items-center">
                        <button type="submit" className="w-full bg-blue-500 text-white text-center p-2 rounded-lg mb-5 font-semibold">Criar conta</button>
                        <p className="text-gray-600">Já tem uma conta? <Link to="/">Faça Login</Link></p>
                    </footer>
                </form>
            </div>
        </>
    )
}