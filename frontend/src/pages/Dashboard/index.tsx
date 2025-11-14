import { Plus, FilterIcon, Pen, Trash2, Check } from "lucide-react"
import ModalNewTask from "../../components/ModalNewTask"
import { useState, useEffect } from "react"
import api from "../../services/api"
import ModalEditTask from "../../components/ModalEditTask"
import { jwtDecode } from "jwt-decode"

export default function Dashboard(){
    const [aparecer, setAparecer] = useState<boolean>(false)
    const [tituloModalEdit, setTituloModalEdit] = useState<string>("")
    const [userIdModalEdit, setUserIdModalEdit] = useState<string>("")
    const [statusModalEdit, setStatusModalEdit] = useState<string>("")
    const [idModalEdit, setIdModalEdit] = useState<string>("")
    const [create_timeModalEdit, setCreateTimeModalEdit] = useState<string>("")
    const [descricaoModalEdit, setDescricaoModalEdit] = useState<string>("")
    const [aparecer2, setAparecer2] = useState<boolean>(false)
    const [taskList, setTaskList] = useState<any>([])
    const [filterList, setFilterList] = useState<any>([]) 
        
    useEffect(()=>{
        async function listar(){
            let getID : any = localStorage.getItem("object")
            getID = JSON.parse(getID)
            const decode : any = jwtDecode(getID)
        
        if(decode.id){
            await api.get(`/task/${decode.id}`).then(res=>{
                localStorage.setItem("tasks",JSON.stringify(res.data))
            }).catch(err=>console.log(err))

            let list : any = localStorage.getItem("tasks")
            list = JSON.parse(list)
            setTaskList(list)
            return
        }
        
        }
        listar()
},[])

   async function deletarTask(task_id:any){
    const filt = taskList.filter((item:any)=>item.id !== task_id)
    localStorage.setItem("tasks",JSON.stringify(filt))

        await api.delete(`task/${task_id}`)
        .then(()=>alert("Tarefa deletada"))
        .catch(err=>console.log(err))
        
    }
    function modaledit(titulo:string, descricao:string, status:string, create_time:string, user_id:string, id:string){
        setAparecer2(!aparecer2)
        setTituloModalEdit(titulo)
        setDescricaoModalEdit(descricao)
        setStatusModalEdit(status)
        setCreateTimeModalEdit(create_time)
        setUserIdModalEdit(user_id)
        setIdModalEdit(id)
    }
    function tarefaConcluida(id:any){
        api.patch(`/task/${id}`,{
            status:"Concluida"
        }).then(res=>alert(res.data.msg))
        .catch(err=>alert(err.data.msg))
    }
    async function filter(status:string){
        if(status){
            await api.get(`/task/filter/${status}`)
            .then(res=>{
            setFilterList(res.data)
        }).catch(()=>alert("Erro ao filtrar as tarefas"))
        return
        }
    }
    return(
        <>  
            <main className="main max-md:w-full flex flex-col justify-center max-md:px-5">
                <section className="flex items-center justify-between max-md:justify-between">
                    <div>
                        <span className="text-3xl font-medium block max-sm:hidden mb-2">Minhas Tarefas</span>
                        <span className="max-sm:hidden">2 tarefas pendentes . 1 concluida</span>
                    </div>
                    <div className="max-sm:w-full">
                        <button className="flex bg-sky-600 text-white py-2 px-3 rounded-xl gap-2 font-semibold text-base max-sm:w-full" onClick={()=>setAparecer(!aparecer)}><Plus/> Nova Tarefa</button>
                    </div>
                </section>

                <section className="flex items-center justify-between max-md:px-4 max-md:justify-start max-md:mt-2 mt-5 mb-6">
                    <div className="flex items-center gap-1">
                        <FilterIcon className="size-5"/>
                        <div className="bg-white rounded-xl flex gap-1 border-2 p-1">
                            
                            <button className="bg-sky-600 px-1 rounded-lg text-white font-medium" onClick={()=>filter("")}>Todas (3)</button>
                            <button  onClick={()=>filter("Pendentes")}>Pendente</button>
                            <button onClick={()=>filter("Concluida")}>Concluidas</button>
                        </div>
                    </div>
                </section>
                <ul>
                    {taskList.map((item:any)=>{
                        return(
                           <li key={item.id}>
                                {item.status === "Pendente"
                                ?<section className="bg-white p-3 rounded-xl h-40 flex flex-col justify-between max-md:px-5 mb-4 border-2 border-gray-300 shadow shadow-gray-600">
                                <div className="flex justify-between ">
                                    <div className="flex gap-2">
                                        <input type="checkbox" name="concluido" id="" className="mb-6" onClick={()=>tarefaConcluida(item.id)}/>
                                        <div className="flex flex-col">
                                            <span>{item.titulo}</span>
                                            <span>{item.descricao}</span>
                                        </div>
                                    </div>
                                    <span className="bg-yellow-300/40 h-fit rounded-xl py-1 px-2 text-yellow-700 font-medium">{item.status}</span>
                                </div>
                                
                                <div className="flex justify-between">
                                    <span className="text-base">{item.create_time}</span>
                                    <span className="flex gap-4"><Pen className="size-4 cursor-pointer" onClick={()=>modaledit(item.titulo, item.descricao, item.status, item.create_time, item.user_id, item.id)}/><Trash2 className="size-4 cursor-pointer" onClick={()=>deletarTask(item.id)}/></span>
                                </div>
                            </section>
                            :<section className="bg-gray-300 p-3 rounded-xl h-40 flex flex-col justify-between max-md:px-5 mb-4 border-2 border-gray-300 shadow shadow-gray-600">
                            <div className="flex justify-between ">
                                <div className="flex gap-2">
                                    <input type="checkbox" checked name="concluido" id="" className="mb-6"/>
                                    <div className="flex flex-col">
                                        <span className="line-through font-medium">{item.titulo}</span>
                                        <span className="line-through">{item.descricao}</span>
                                    </div>
                                </div>
                                <span className="bg-green-300/40 h-fit rounded-xl py-1 px-2 text-green-700 font-medium flex items-center"><Check className="size-4"/> {item.status}</span>
                            </div>
                            
                            <div className="flex justify-between">
                                <span className="text-base">{item.create_time}</span>
                                <span className="flex gap-4">
                                    <Pen className="size-4 cursor-not-allowed"/><Trash2 className="size-4 cursor-pointer" onClick={()=>deletarTask(item.id)}/></span>
                            </div>
                        </section>}
                           </li>
                        )
                    })}
                </ul>
                {aparecer && <ModalNewTask setAparecer={setAparecer}/>}
                {aparecer2 && <ModalEditTask setAparecer2={setAparecer2} tituloModalEdit={tituloModalEdit} descricaoModalEdit={descricaoModalEdit} statusModalEdit={statusModalEdit} create_timeModalEdit={create_timeModalEdit} userIdModalEdit={userIdModalEdit} idModalEdit={idModalEdit}/>}
            </main>
            
        </>
    )
}