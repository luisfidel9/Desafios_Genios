import jwt from 'jsonwebtoken'
import { promisify } from 'util'


async function AuthMiddleware(req, res, next){
   const authorizations = req.headers.authorization

   if(!authorizations){
    res.json({msg:"O token não foi enviado"})
    return
   }
   const [Bearer, token] = authorizations.split(' ')
   
   console.log()
   try{
    const decoded = await promisify(jwt.verify)(token, "Ds5678sD@")

    console.log("Token válido")
    return next()
   }
   catch(erro){
    res.status(400).json({msg:"Token invalido ou expirado"})
   }
}

export default AuthMiddleware