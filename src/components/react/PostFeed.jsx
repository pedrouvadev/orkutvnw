import { useEffect, useState } from "react";
import PostItem from "./PostItem";
import api from "../../services/api";

export default function PostFeed() {
  const [posts, setPosts] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/orkutvnw/login";
      return;
    }
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
    localStorage.removeItem("token");
    window.location.href = "/orkutvnw/login";
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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Feed</h1>
        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-red-500/80 text-white font-semibold rounded-lg hover:bg-red-600/80 transition-all duration-300"
        >
          Sair
        </button>
      </div>

      {/* FORM DE POSTAGEM */}
      <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20">
        <input
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
        />

        <textarea
          placeholder="O que você está pensando?"
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
          className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4 min-h-[120px] resize-none"
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
          >
            {editandoId ? "Atualizar Post" : "Postar"}
          </button>

          {editandoId && (
            <button
              type="button"
              className="px-6 py-3 bg-gray-500/80 text-white font-bold rounded-lg hover:bg-gray-600/80 transition-all duration-300"
              onClick={() => {
                setEditandoId(null);
                setTitulo("");
                setConteudo("");
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {/* LISTA DE POSTS */}
      <div>
        {posts.length === 0 ? (
          <p className="text-white/80 text-center text-xl">Nenhum post ainda...</p>
        ) : (
          posts.map((post) => (
            <PostItem key={post.post_id} post={post} onEdit={handleEdit} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
}
