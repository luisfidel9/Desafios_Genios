import { createContext, useState, useEffect, useContext } from "react";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Importe para decodificar o token
// Se jwt-decode não estiver instalado, execute: npm install jwt-decode

export const AuthContext = createContext();

const API_BASE_URL = "http://127.0.0.1:8000/api";

// Função de utilidade para deslogar e limpar o storage
const doLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    // Redireciona para o login (será chamado dentro do AuthProvider)
    // window.location.href = '/login'; 
};

// -------------------------------------------------------------------------
// INSTÂNCIA DO AXIOS COM INTERCEPTORS (Para Requisições Protegidas)
// -------------------------------------------------------------------------

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

// Interceptor de Requisição: Anexa o Access Token
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("access");
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor de Resposta: Lida com 401 e tenta o Refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        // Verifica se é erro 401 (Token Expirado) e se ainda não foi retentada
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refresh');
                if (!refreshToken) {
                    doLogout();
                    return Promise.reject(error);
                }

                // 🎯 REFRESH TOKEN
                const refreshResponse = await axios.post(`${API_BASE_URL}/token/refresh/`, { 
                    refresh: refreshToken 
                });

                const newAccessToken = refreshResponse.data.access; 
                localStorage.setItem('access', newAccessToken); 
                
                // Atualiza o header da requisição original e a repete
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return api(originalRequest); 

            } catch (refreshError) {
                // Se o refresh falhar, desloga
                doLogout(); 
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

// -------------------------------------------------------------------------
// AUTH PROVIDER
// -------------------------------------------------------------------------

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('access');
        return token ? jwtDecode(token) : null;
    });
    
    // Função para atualizar o estado do usuário decodificando o token
    const updateAuth = (access, refresh) => {
        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);
        // O ID do usuário (user_id) está no payload do SimpleJWT
        setUser(jwtDecode(access)); 
    };

    const logout = () => {
        doLogout();
        setUser(null);
    };

    const login = async (username, password) => {
        try {
            // Usa axios normal, pois ainda não há token
            const response = await axios.post(`${API_BASE_URL}/token/`, { 
                username, 
                password,
            });

            const { access, refresh } = response.data;
            updateAuth(access, refresh);

        } catch (error) {
            // O tratamento de erro 400 (Credenciais Inválidas) é essencial
            if (error.response && error.response.status === 400) {
                alert("Credenciais inválidas. Verifique nome de usuário e senha.");
            } else {
                alert("Erro inesperado ao tentar login.");
            }
            throw error; // Propaga o erro para o componente Login
        }
    };
    
    // O valor do user agora é o objeto decodificado, incluindo user.user_id
    const contextValue = { 
        user: user ? { id: user.user_id, username: user.username } : null, 
        login, 
        logout, 
        api // Exporta a instância protegida
    };

    return (
        <AuthContext.Provider value={contextValue}>
            { children }
        </AuthContext.Provider>
    );
}

// Hook Customizado para simplificar o uso
export const useAuth = () => useContext(AuthContext);