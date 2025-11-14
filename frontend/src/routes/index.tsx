import CadastrarUser from "../pages/CadastrarUser";
import Header from "../components/Header";
import LoginUser from "../pages/LoginUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context";
import Erro from "../pages/Erro";
import Dashboard from "../pages/Dashboard";
import PublicPage from "./public";
import PrivatePage from "./private";


export default function Router(){
    const sign = useContext(UserContext)
    if (!sign) return null
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/cadastrar" element={<PublicPage logado={sign.logado}>
                    <CadastrarUser/>
                </PublicPage>}/>
                <Route path="/" element={<PublicPage logado={sign.logado}>
                    <LoginUser/>
                </PublicPage>}/>
                
                <Route path="/dashboard" element={<PrivatePage logado={sign.logado}>
                    <Header/>
                    <Dashboard/>
                </PrivatePage>}/>
                <Route path="*" element={<Erro/>}/>
            </Routes>
        </BrowserRouter>
    )
}