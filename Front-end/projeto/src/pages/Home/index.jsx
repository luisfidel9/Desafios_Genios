import { useEffect, useState } from 'react';
import './index.css'
import { useAuth } from '../../components/context/AuthContext'; // Use o hook customizado
import LogoutButton from '../../components/LogoutButton'; // Assumindo que você criou este componente

const TAREFAS_URL = '/tarefas/'; 

export default function Home() {

  // O 'user' agora tem { id: 1, username: 'teste' }
  const { user, api, logout } = useAuth(); 
  
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState({ titulo: '', descricao: '' });

  // --- Funções de API ---
  const fetchTarefas = () => {
    // Usamos a instância 'api' para buscar, mesmo que não haja login.
    // O backend permite GET para todos (IsAuthenticatedOrReadOnly).
    api.get(TAREFAS_URL)
      .then(res => setTarefas(res.data))
      .catch(err => {
        // Se 401 acontecer aqui, o interceptor deveria ter resolvido.
        console.error("Erro ao buscar tarefas:", err);
      });
  };

  useEffect(() => {
    fetchTarefas();
  }, [api]); // Dependência 'api' para re-executar se o interceptor atualizar o token

  const handleCriar = () => {
    if (!user) {
      alert("Você deve estar logado para criar tarefas.");
      return;
    }
    if (!novaTarefa.titulo.trim()) {
      alert("O título é obrigatório.");
      return;
    }

    api.post(TAREFAS_URL, novaTarefa)
      .then(res => {
        setTarefas([...tarefas, res.data]);
        setNovaTarefa({ titulo: '', descricao: '' }); 
      })
      .catch(err => console.error("Erro ao criar tarefa:", err));
  };

  const handleExcluir = (id) => {

    api.delete(`${TAREFAS_URL}${id}/`)
      .then(() => {
        setTarefas(tarefas.filter(t => t.id !== id));
      })
      .catch(err => {
        alert("Falha ao excluir. O backend negou a permissão (403) ou a tarefa não existe (404).");
        console.error("Erro DELETE:", err);
      });
  };

  // --- Renderização ---
  return (
    <div className='main' >
      <div className='header'>
        <h2>Lista de Tarefas</h2>
        {user ? <LogoutButton onLogout={logout} /> : <a href="/login">Faça Login</a>}
      </div>

      {/* Formulário de Criação (Só aparece se estiver logado) */}
      {user && (
        <div >
            <h3>Nova Tarefa</h3>
            <input
                type="text"
                placeholder="Título"
                value={novaTarefa.titulo}
                onChange={(e) => setNovaTarefa({ ...novaTarefa, titulo: e.target.value })}
            /> { }
            <input
                type="text"
                placeholder="Descrição"
                value={novaTarefa.descricao}
                onChange={(e) => setNovaTarefa({ ...novaTarefa, descricao: e.target.value })}
            /> { }
            <button onClick={handleCriar}>Criar Tarefa</button>
        </div>
      )}

      {/* Lista de Tarefas (Aparece para todos) */}
      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id} >
            <strong>{tarefa.titulo}</strong> (Criada por: {tarefa.username || 'Desconhecido'})
            <p>"{tarefa.descricao}"</p>
            
            {/* Condição de Permissão: Botão de excluir só aparece se logado E for o dono */}
            {user && user.id && (
              <button className='delete'
                onClick={() => handleExcluir(tarefa.id, tarefa.usuario)}
              >
                Excluir
              </button>
            )}
            <hr />
          </li>
          
        ))}
      </ul>
    </div>
  );
}