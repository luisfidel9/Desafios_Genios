import express from 'express'
import cors from 'cors'
import route from './routes/UserRoutes.js'

export const server = express()

server.use(cors({origin:'http://localhost:5173'}))
server.use(express.json())
server.use(route)

server.listen(3030,(erro)=>{
    if(erro){
        console.log("O servidor não está rodando")
        return
    }
    console.log("Servidor rodando na porta 3030")

})




