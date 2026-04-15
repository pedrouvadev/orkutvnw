import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import s from "./Register.module.scss";
import { useState } from "react";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    try {
      const res = await api.post("/usuarios", {nome, email, senha});
      console.log("Resposta do cadastro:", res.data);
      alert("Usuário criado, você será redirecionado para a tela login!");
      navigate("/login")
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao cadastrar: " + (error.response?.data?.message || error.message));
    }
  }


  return (
    <div className={s.registerContainer}>
      <form onSubmit={handleRegister}>
        <h2>Cadastro</h2>
        <input 
          placeholder="Nome" 
          value={nome}
          onChange={(e) => setNome(e.target.value)} 
        />
        <input 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={senha}
          onChange={(e) => setSenha(e.target.value)} 
        />
        <button>Cadastrar</button>
      </form>
    </div>
  );
}