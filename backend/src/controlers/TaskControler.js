import { pool } from "../config/db.js";
import { taskChema } from "../config/yupTasks.js";

class TaskControler{
    async store(req, res){
        try{
            const {create_time,titulo,descricao,user_id,status} = req.body

            if(!titulo || !descricao || !user_id || !status){
                res.status(400).json("Há informações que não foram preenchidas")
                return
            }
            const [result] = await pool.query("INSERT INTO tasks(create_time, titulo, descricao, user_id, Status) VALUES(?,?,?,?,?)", [create_time, titulo, descricao, user_id, status])
            res.json({msg:"tarefa registrada"})
        }
        catch(erro){
            res.status(400).json(erro)
        }
    }
    async show(req, res){
        try{
            const { id } = req.params
            if(!id){
                res.status(400).json("O id do usuário nao foi enviado")
                return
            }
            const [rows] = await pool.query("SELECT * FROM tasks WHERE user_id = ?",[id])
            res.json(rows)
        }
        catch(erro){
            res.status(500).json({error:"Erro ao carregar os dados"})
        }
    }
    async destroy(req, res){
        try{
            const { id } = req.params

            if(!id){
                res.status(200).json({})
                return
            }
            pool.query("DELETE FROM tasks WHERE id = ?",[id])
        }
        catch(erro){
            res.json({err:"Erro ao deletar usuário"})
        }
    }
    async update(req, res){
        try{
            const {create_time,titulo,descricao,user_id,status} = req.body
            const { id } = req.params


            if(!titulo || !descricao || !user_id || !status){
                res.status(400).json("Há informações que não foram preenchidas")
                return
            }

            const [result] = await pool.query("UPDATE tasks SET create_time = ?, titulo = ?, descricao = ?, user_id = ?, Status = ? WHERE id = ?", [create_time, titulo, descricao, user_id, status, id])
            res.json({msg:"Dados atualizaos"})
    
        }
        catch(err){
            res.status(500).json({msg:err})
        }
    }
    async partupdate(req, res){
        const { status } = req.body
        const { id } = req.params
        
        if(!status){
            res.status(400).json({msg:"Status nao enviado"})
            return
        }
        try{
            const [result] = pool.query("UPDATE tasks SET Status = ? WHERE id = ?", [status, id])
            res.json({msg:"Tarefa concluida"})
        }catch(err){
            res.status(500).json({msg:"Erro ao atualizar o status"})
        }
    }
}
export default new TaskControler()