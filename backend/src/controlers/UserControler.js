import { pool } from "../config/db.js";
import { userSchema } from "../config/yupConfig.js";

class UserControler{
    async store(req, res){
        try{
            const { nome, email, senha } = req.body
            await userSchema.validate(req.body, { abortEarly: false })
            const [result] = await pool.query("INSERT INTO user(nome, email, senha) VALUES(?, ?, ?)",[nome, email,senha])
            
            res.status(201).json(req.body)
        }
        catch(err){
            
            if(err){
                res.status(400).json({erro:err.errors})
                return
            }
        }
    }
}

export default new UserControler()