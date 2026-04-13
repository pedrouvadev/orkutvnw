import s from "./Register.module.scss";

export default function Register() {



  return (
    <div className={s.registerContainer}>
      <form onSubmit={}>
        <h2>Cadastro</h2>
        <input placeholder="Nome" onChange={} />
        <input placeholder="Email" onChange={} />
        <input type="password" placeholder="Senha" onChange={} />
        <button>Cadastrar</button>
      </form>
    </div>
  );
}