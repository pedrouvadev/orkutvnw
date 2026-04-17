import { useState, useEffect } from "react";
import api from "../../services/api";

export default function AuthForm({ mode }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");

  useEffect(() => {
    // Redirect authenticated users away from login/register
    const token = localStorage.getItem("token");
    if (token && mode === "login") {
      window.location.href = "/orkutvnw/";
    }
  }, [mode]);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await api.post("/login", { email, senha });
      localStorage.setItem("token", res.data.token);
      // Store user info if available from backend
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
      alert("Login realizado!");
      // Small delay to ensure token is stored before redirect
      setTimeout(() => {
        window.location.href = "/orkutvnw/";
      }, 100);
    } catch (error) {
      alert("Erro ao logar: " + (error.response?.data?.message || error.message));
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const res = await api.post("/usuarios", { nome, email, senha });
      alert("Usuário criado, você será redirecionado para a tela de login!");
      window.location.href = "/orkutvnw/login";
    } catch (error) {
      alert("Erro ao cadastrar: " + (error.response?.data?.message || error.message));
    }
  }

  return (
    <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20">
      <form onSubmit={mode === "login" ? handleLogin : handleRegister} className="space-y-4">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          {mode === "login" ? "Login" : "Cadastro"}
        </h2>
        
        {mode === "register" && (
          <div>
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        )}
        
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        <div>
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
        >
          {mode === "login" ? "Entrar" : "Cadastrar"}
        </button>
      </form>
      
      {mode === "login" && (
        <div className="mt-6 text-center">
          <p className="text-white/80 mb-2">Não tem cadastro? Crie um:</p>
          <button
            onClick={() => window.location.href = "/orkutvnw/register"}
            className="px-6 py-2 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition-all duration-300"
          >
            Cadastre-se
          </button>
        </div>
      )}
      
      {mode === "register" && (
        <div className="mt-6 text-center">
          <p className="text-white/80 mb-2">Já tem cadastro? Faça login:</p>
          <button
            onClick={() => window.location.href = "/orkutvnw/login"}
            className="px-6 py-2 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition-all duration-300"
          >
            Fazer Login
          </button>
        </div>
      )}
    </div>
  );
}
