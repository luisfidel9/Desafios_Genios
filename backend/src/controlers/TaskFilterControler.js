import { pool } from "../config/db.js";



class TaskFilterControler{
   async show(req, res){
        try{
            const { status } = req.params

            if(!status){
                console.log("Status não enviado")
                return
            }
            const [rows] = await pool.query("SELECT *FROM tasks WHERE Status = ?",[status])
            res.json(rows)

        }
        catch(err){
            res.status(500).json({mgs:"Erro ao filtrar as tarefas"})
        }
    }
}
export default new TaskFilterControler()