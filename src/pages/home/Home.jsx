import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Post from "../../components/post/Post";
import api from "../../services/api";
import s from "./Home.module.scss";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const res = await api.get("/posts");
      setPosts(res.data);
    } catch {
      alert("Erro ao carregar posts");
    }
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (editandoId) {
        await api.put(`/posts/${editandoId}`, { titulo, conteudo });
        alert("Post atualizado!");
      } else {
        await api.post("/posts", { titulo, conteudo });
        alert("Post criado!");
      }
      setTitulo("");
      setConteudo("");
      setEditandoId(null);
      fetchPosts();
    } catch {
      alert("Erro ao salvar post");
    }
  }

  function handleEdit(post) {
    setEditandoId(post.post_id);
    setTitulo(post.titulo);
    setConteudo(post.conteudo);
  }

  async function handleDelete(postId) {
    if (!window.confirm("Tem certeza que deseja excluir?")) return;

    try {
      await api.delete(`/posts/${postId}`);
      alert("Post excluído!");
      fetchPosts();
    } catch {
      alert("Erro ao excluir post");
    }
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
        <form className={s.postForm} onSubmit={handleSubmit}>
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