export default function PostItem({ post, onEdit, onDelete }) {
  return (
    <div className="p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 mb-4 hover:bg-white/15 transition-all duration-300">
      <h3 className="text-2xl font-bold text-white mb-2">{post.titulo}</h3>
      <p className="text-white/90 mb-4 whitespace-pre-wrap">{post.conteudo}</p>
      <small className="text-white/60 block mb-4">Por: {post.nome}</small>

      <div className="flex gap-3">
        <button
          onClick={() => onEdit(post)}
          className="px-4 py-2 bg-blue-500/80 text-white rounded-lg hover:bg-blue-600/80 transition-all duration-300"
        >
          ✏️ Editar
        </button>
        <button
          onClick={() => onDelete(post.post_id)}
          className="px-4 py-2 bg-red-500/80 text-white rounded-lg hover:bg-red-600/80 transition-all duration-300"
        >
          🗑️ Excluir
        </button>
      </div>
    </div>
  );
}
