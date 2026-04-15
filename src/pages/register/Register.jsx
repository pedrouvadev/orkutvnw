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
      await api.post("/usuarios", {nome, email, senha});
      alert("Usuário criado, você será redirecionado para a tela login!");
      navigate("/login")
    } catch {
      alert("Erro ao cadastrar")
    }
  }


  return (
    <div className={s.registerContainer}>
      <form onSubmit={handleRegister}>
        <h2>Cadastro</h2>
        <input placeholder="Nome" onChange={(e) => setNome(e.target.value)} />
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} />
        <button>Cadastrar</button>
      </form>
    </div>
  );
}