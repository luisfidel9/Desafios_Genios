import { useState } from 'react';
import './index.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/context/AuthContext'; // Usa o hook customizado

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  // Extraímos a função 'login' do Context
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // 🎯 Chama a função login do Context. Ela faz a requisição, armazena o token e define o 'user'.
      await login(username, password); 
      
      // Se for bem-sucedido, redireciona para a home
      navigate("/");
      
    } catch (error) {
        // Erro 400 (Credenciais Inválidas) já é tratado no AuthContext,
        // mas o 'catch' é necessário aqui para evitar que o código de navegação seja executado.
        console.log("Falha no login.");
    }
  };

  return (
    <div className='login' >
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuário, nome sem espaços"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoComplete="username"
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <br />
        <br />
        <button type="submit">
            Entrar
        </button>
        <p>Não tem conta? <a href="/register">Cadastre-se</a></p>
      </form>
    </div>
  );
}