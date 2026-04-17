import { useEffect, useState, useCallback } from "react";
import PostItem from "./PostItem";
import api from "../../services/api";

// Decode JWT to get user ID
function decodeToken(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export default function PostFeed() {
  const [posts, setPosts] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [titulo, setTitulo] = useState("");

  const toast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const [conteudo, setConteudo] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/orkutvnw/login";
      return;
    }
    // Decode JWT to get user ID
    const decoded = decodeToken(token);
    if (decoded?.id) {
      setCurrentUserId(decoded.id);
    }
    fetchPosts();
  }, [refreshKey]);

  async function fetchPosts() {
    try {
      const res = await api.get("/posts");
      setPosts(res.data);
    } catch {
      toast("Erro ao carregar posts", "error");
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("post_reactions");
    window.location.href = "/orkutvnw/login";
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!titulo.trim() || !conteudo.trim()) {
      toast("Preencha título e conteúdo", "error");
      return;
    }

    try {
      if (editandoId) {
        await api.put(`/posts/${editandoId}`, { titulo, conteudo });
        toast("Post atualizado!");
      } else {
        await api.post("/posts", { titulo, conteudo });
        toast("Post criado!");
      }
      setTitulo("");
      setConteudo("");
      setEditandoId(null);
      fetchPosts();
    } catch (err) {
      const msg = err.response?.data?.mensagem || err.response?.data?.message || "Erro ao salvar post";
      toast(msg, "error");
    }
  }

  function handleEdit(post) {
    setEditandoId(post.post_id);
    setTitulo(post.titulo);
    setConteudo(post.conteudo);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(postId) {
    if (!window.confirm("Tem certeza que deseja excluir?")) return;

    try {
      await api.delete(`/posts/${postId}`);
      toast("Post excluído!");
      fetchPosts();
    } catch (err) {
      const msg = err.response?.data?.mensagem || err.response?.data?.message || "Erro ao excluir post";
      toast(msg, "error");
    }
  }

  function handleReact(postId, reactionType) {
    if (!currentUserId) return;

    try {
      const all = JSON.parse(localStorage.getItem("post_reactions") || "{}");
      const postReactions = all[postId] || {};

      if (reactionType === null) {
        // Remove reaction
        delete postReactions[currentUserId];
      } else {
        // Add/update reaction
        postReactions[currentUserId] = reactionType;
      }

      all[postId] = postReactions;
      localStorage.setItem("post_reactions", JSON.stringify(all));
      // Force re-render
      setRefreshKey(k => k + 1);
    } catch {
      toast("Erro ao salvar reação", "error");
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Toast notifications */}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`px-4 py-3 rounded-lg shadow-lg text-white font-semibold text-sm ${
              t.type === "success" ? "bg-green-500/90" : t.type === "error" ? "bg-red-500/90" : "bg-blue-500/90"
            }`}
            style={{ animation: "slideIn 0.3s ease-out" }}
          >
            {t.message}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
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
            <PostItem 
              key={post.post_id} 
              post={post} 
              currentUserId={currentUserId}
              onEdit={handleEdit} 
              onDelete={handleDelete}
              onReact={handleReact}
            />
          ))
        )}
      </div>
    </div>
  );
}
