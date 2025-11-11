import React, { useContext } from 'react';
import { AuthContext } from '../components/context/AuthContext'; // Ajuste o caminho conforme a sua estrutura
import { useNavigate } from 'react-router-dom';

/**
 * Componente que exibe um botão de "Sair" e chama a função logout
 * do AuthContext ao ser clicado.
 */
export default function LogoutButton() {
  // Acessa a função logout do seu contexto de autenticação
  const { logout } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Chama a função logout() para limpar os tokens no localStorage e o estado
    logout(); 
    
    // 2. Redireciona o usuário para a página de login ou home (desprotegida)
    navigate('/login'); 
  };

  return (
    <button 
      onClick={handleLogout} 
      style={{ 
        padding: '10px 15px', 
        backgroundColor: '#dc3545', // Cor de erro/sair
        color: 'white', 
        border: 'none', 
        borderRadius: '5px', 
        cursor: 'pointer' 
      }}
    >
      Sair
    </button>
  );
}