import { Router } from "express";
import UserControler from "../controlers/UserControler.js";
import SessionControler from "../controlers/SessionControler.js";
import TaskControler from "../controlers/TaskControler.js";
import TaskFilterControler from "../controlers/TaskFilterControler.js";
import AuthMiddleware from "../middleware/auth.js";

const route = Router()
//ROTAS NÃO AUTENTICADAS
route.post("/api/cadastrar", UserControler.store)
route.post("/api/session", SessionControler.store)

//MIDDLEWARE DE AUTENTICAÇÃO
route.use(AuthMiddleware)

//ROTAS AUTENTICADAS
route.post("/api/task",TaskControler.store)
route.put("/api/task/:id",TaskControler.update)
route.patch("/api/task/:id",TaskControler.partupdate)
route.get("/api/task/:id",TaskControler.show)
route.delete("/api/task/:id",TaskControler.destroy)

route.get("/api/task/filter/:status",TaskFilterControler.show)

export default route