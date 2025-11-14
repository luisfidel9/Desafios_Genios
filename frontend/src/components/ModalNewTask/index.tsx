import { X } from "lucide-react"
import type React from "react"
import api from "../../services/api"
import { useState } from "react"


interface PropsType{
    setAparecer: React.Dispatch<React.SetStateAction<boolean>>
}
export default function ModalNewTask(props:PropsType){
    const [titulo, setTitulo] = useState<string>("")
    const [descricao, setDescricao] = useState<string>("")
    const [user_id, setUserId] = useState<any>()
  
    function desaparecer(){
        props.setAparecer(false)
    }
    async function registrar(e:any){
        e.preventDefault()
        let user_token_decoded : any = sessionStorage.getItem("user_id")
        let token :any = localStorage.getItem("object")
        const date = new Date
        const month = ["jan","fev","marc","abr","mai","jun","jul","ago","set","out","nov","dez",]
        const today = `${date.getDate()} de ${month[date.getMonth()]} de ${date.getFullYear()}`
        const status = "Pendente"
        token = JSON.parse(token)
         setUserId(JSON.parse(user_token_decoded))


        
        await api.post("/task",{
            create_time:today,
            titulo: titulo,
            descricao:descricao,
            user_id:user_id.id,
            status:status,
            
        }).then(res=>{
            console.log(res.data)
        })
        .catch(err=>console.log(err))
    }
    return(
        <>
            <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/80 z-99 flex items-center justify-center" id="registrar">
                <form className="bg-white flex flex-col w-100 rounded-xl max-md:mx-5 p-6" onClick={e=>registrar(e)}>
                    <div className="mb-5">
                        <label className="flex justify-between items-center text-black font-semibold text-xl">Nova Tarefa <X className="size-5 cursor-pointer" onClick={desaparecer}/></label>
                        <p>Preencha os campos para criar uma nova tarefa</p>
                    </div>
                    <div className="flex flex-col mb-5 gap-5">
                        <div className="flex flex-col">
                            <label htmlFor="titulo" className="font-semibold text-lg">Titulo</label>
                            <input type="text" className="bg-gray-200 h-8 rounded-lg pl-4" id="titulo" placeholder="Ex:Finalizar relatório" onChange={e=>setTitulo(e.target.value)} />
                        </div>
                        <div  className="flex flex-col">
                            <label htmlFor="descricao" className="font-semibold text-lg">Descrição</label>
                            <textarea name="" id="descricao" cols={30} rows={10} className="bg-gray-200 h-28 rounded-lg pl-4" placeholder="Descreva os detalhes da tarefa" onChange={e=>setDescricao(e.target.value)}></textarea>
                        </div>
                    </div>
                    <div className="flex justify-end items-center">
                        <button className="border py-2 border-black font-semibold  px-3 rounded-lg" onClick={()=>props.setAparecer(false)}>Cancelar</button>
                        <button className="border py-2 px-3 rounded-lg bg-sky-600 text-white font-semibold" onClick={desaparecer} type="submit">Criar tarefa</button>
                    </div>
                </form>
            </div>
        </>
    )
}