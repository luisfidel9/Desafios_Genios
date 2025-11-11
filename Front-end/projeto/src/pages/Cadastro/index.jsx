import { useState } from 'react';
import './index.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = "http://127.0.0.1:8000/api";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // Adicionado campo de email
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!username || !password) {
        alert("Usuário e senha são obrigatórios.");
        return;
    }

    try {
      // 🎯 Chamada direta ao endpoint de Cadastro (Não precisa do 'api' do Context)
      await axios.post(`${API_BASE_URL}/cadastro/`, {
        username,
        password,
        email: email || null, // Envia email ou null se vazio
      });

      alert("Cadastro realizado com sucesso! Faça o login.");
      navigate("/login"); // Redireciona para o login após o sucesso

    } catch (error) {
      console.error("Erro no cadastro:", error);
      if (error.response && error.response.status === 400) {
        // Exibe mensagens de erro do backend (ex: usuário já existe)
        const errors = error.response.data;
        const errorMessages = Object.keys(errors)
        .map(key => `${key}: ${errors[key].join(', ')}`)
        .join('\n');
        alert(`Erro de Validação:\n${errorMessages}`);
      } else {
        alert("Erro inesperado ao tentar cadastrar.");
      }
    }
  };

  return (
    <div className='cadastro' >
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuário, nome sem espaços"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <br />
        <input
          type="email"
          placeholder="Email (Opcional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <br />
        <button type="submit">
            Cadastrar
        </button>
        <p>Já tem conta? <a href="/login">Fazer Login</a></p>
      </form>
    </div>
  );
}