import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Register from './pages/Cadastro'
import Login from './pages/Login'
import Home from './pages/Home'
import { AuthProvider } from './components/context/AuthContext'



export default function AppRoute() {
  return (
    <BrowserRouter>
      <AuthProvider> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Adicione outras rotas aqui */}
          <Route path="*" element={<Home />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
