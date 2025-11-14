import axios from "axios";


const api = axios.create({
    baseURL:"http://127.0.0.1:3030/api/",
    headers: {
        "Content-Type": "application/json"
      }
})

api.interceptors.request.use((config)=>{
  const token : any = localStorage.getItem("object")
  const Decotoken = JSON.parse(token)
  if(token){
    config.headers.Authorization = `Bearer ${Decotoken}`
  }
  return config
})

api.interceptors.response.use(response=>response, erro=>{
  if(erro.response.data.msg === "Token invalido ou expirado"){
    localStorage.removeItem("object")
    sessionStorage.removeItem("user_ud")
    window.location.href = "/"
  }
  return Promise.reject(erro)
})

export default api