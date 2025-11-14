import { pool } from "../config/db.js"
import jwt from 'jsonwebtoken'
import { sessionSchema } from "../config/yupSession.js"


class SessionControler{
    async store(req, res){
      try{
        const { email, senha } = req.body

        await sessionSchema.validate(req.body, {abortEarly:false})

        const [rows] = await pool.query("SELECT * FROM user")
        const filt = rows.filter(item=>item.email === email)
        if(String(filt[0].email) !== String(email) || String(filt[0].senha) !== String(senha)){
            console.log("Erro ao iniciar sessão!!!")
            return
        }
        const { id, nome } = filt[0]
        res.json({user:{id, nome, email},
        token: jwt.sign({id},"Ds5678sD@",{
            expiresIn: '7d'
        })})
      }
      catch(err){
       if(err.errors){
        res.status(400).json({msg:err.errors})
       }
       else{
        console.log(err)
       }
      }
    }
}

export default new SessionControler()