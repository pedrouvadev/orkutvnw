import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Post from "../../components/post/Post";
import s from "./Home.module.scss";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  
  function handleLogout() {
    logout();          // remove token
    navigate("/login"); // redireciona
  }

  return (
    <>
      <div className={s.home}>
        <h1>Feed</h1>
        <button className={s.btn} onClick={handleLogout}>
          Sair
        </button>
      </div>
      {/* FORM DE POSTAGEM */}
        <form className={s.postForm} onSubmit={}>
          <input
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <textarea
            placeholder="O que você está pensando?"
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
          />

          <button type="submit">{editandoId ? "Atualizar Post" : "Postar"}</button>

          {editandoId && (
            <button
              type="button"
              className="cancel"
              onClick={() => {
                setEditandoId(null);
                setTitulo("");
                setConteudo("");
              }}
            >
              Cancelar
            </button>
          )}
        </form>

        {/* LISTA DE POSTS */}
        <div className={s.postsContainer}>
          {posts.length === 0 ? (
            <p className={s.empty}>Nenhum post ainda...</p>
          ) : (
            posts.map((post) => (
              <Post key={post.post_id} post={post} onEdit={handleEdit} onDelete={handleDelete}/>
            ))
          )}
        </div>
    </>
  );
}