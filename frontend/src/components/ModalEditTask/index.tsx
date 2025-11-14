import { X } from "lucide-react"
import React, { useState } from "react"
import api from "../../services/api"

interface PropsType{
    setAparecer2: React.Dispatch<React.SetStateAction<boolean>>
    tituloModalEdit: string
    descricaoModalEdit:string
    statusModalEdit:string
    create_timeModalEdit:string
    userIdModalEdit:string
    idModalEdit:string
}


export default function ModalEditTask(props:PropsType){
    const [titulo, setTitulo] = useState<string>(props.tituloModalEdit)
    const [descricao, setDescricao] = useState<string>(props.descricaoModalEdit)

    async function atualizar(e:any){
        e.preventDefault()
        const date = new Date
        const month = ["jan","fev","marc","abr","mai","jun","jul","ago","set","out","nov","dez",]
        const today = `${date.getDate()} de ${month[date.getMonth()]} de ${date.getFullYear()}`
        await api.put(`/task/${props.idModalEdit}`,{
            create_time:today,
            titulo: titulo,
            descricao:descricao,
            user_id:props.userIdModalEdit,
            status:props.statusModalEdit,
        }).then((res)=>{
            alert(res.data.msg)
            props.setAparecer2(false)
        })
        .catch((err)=>alert(err.data.msg))
    }
    return(
        <>
            <div className="z-99 bg-black/80 fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center">
            <form className="bg-white flex flex-col w-100 rounded-xl max-md:mx-5 p-6" onSubmit={e=>atualizar(e)}>
                    <div className="mb-5">
                        <label className="flex justify-between items-center text-black font-semibold text-xl">Editar Tarefa <X className="size-5 cursor-pointer" onClick={()=>props.setAparecer2(false)} /></label>
                        <p>Atualize as informações da tarefa</p>
                    </div>
                    <div className="flex flex-col mb-5 gap-5">
                        <div className="flex flex-col">
                            <label htmlFor="titulo" className="font-semibold text-lg">Titulo</label>
                            <input type="text" className="bg-gray-200 h-8 rounded-lg pl-4" id="titulo" placeholder="Ex:Finalizar relatório" value={titulo} onChange={e=>setTitulo(e.target.value)} />
                        </div>
                        <div  className="flex flex-col">
                            <label htmlFor="descricao" className="font-semibold text-lg">Descrição</label>
                            <textarea name="" id="descricao" cols={30} rows={10} className="bg-gray-200 h-28 rounded-lg pl-4" placeholder="Descreva os detalhes da tarefa" value={descricao} onChange={e=>setDescricao(e.target.value)}></textarea>
                        </div>
                    </div>
                    <div className="flex justify-end items-center">
                        <button className="border py-2 border-black font-semibold px-3 rounded-lg" onClick={()=>props.setAparecer2(false)}>Cancelar</button>
                        <button className="border py-2 px-3 rounded-lg bg-sky-600 text-white font-semibold" type="submit">Salvar alterações</button>
                    </div>
                </form>
            </div>
        
        </>
    )
}