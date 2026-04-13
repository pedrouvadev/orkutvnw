import s from "./Login.module.scss";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  return (
    <div className={s.loginContainer}>
      <form onSubmit={}>
        <h2>Login</h2>
        <input placeholder="Email" onChange={} />
        <input type="password" placeholder="Senha" onChange={} />
        <button>Entrar</button>
      </form>
      <div>
        <h6>Não tem cadastro? Crie um:</h6>
        <button onClick={() => (navigate("/cadastro"))}>Cadastre-se</button>
      </div>
    </div>
  );
}