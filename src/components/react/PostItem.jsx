import ReactionPicker from "./ReactionPicker";

const REACTION_EMOJIS = {
  like: "👍",
  love: "❤️",
  laugh: "😂",
  wow: "😮",
  sad: "😢",
  angry: "😡"
};

export default function PostItem({ post, onEdit, onDelete, onReact, currentUserId }) {
  // API returns: { id: userId, nome, titulo, conteudo, criado_em, post_id }
  const postOwnerId = post.id; // id = user ID who created the post
  const isOwner = currentUserId && postOwnerId && String(currentUserId) === String(postOwnerId);

  // Get reactions from localStorage
  const reactions = getReactions(post.post_id);
  const totalReactions = Object.values(reactions).reduce((sum, count) => sum + count, 0);
  const userReaction = getUserReaction(post.post_id, currentUserId);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      let date = new Date(dateString);
      if (isNaN(date.getTime()) && !isNaN(Number(dateString))) {
        date = new Date(Number(dateString));
      }
      if (isNaN(date.getTime())) return "";
      return date.toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch {
      return "";
    }
  };

  const formattedDate = formatDate(post.criado_em);

  return (
    <div className="p-6 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 mb-4 hover:bg-white/15 transition-all duration-300">
      {/* Header with user info and actions */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {post.nome?.charAt(0).toUpperCase() || "U"}
          </div>
          <div>
            <p className="text-white font-semibold">{post.nome}</p>
            {formattedDate && <p className="text-white/50 text-sm">{formattedDate}</p>}
          </div>
        </div>
        
        {isOwner && (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(post)}
              className="px-3 py-2 bg-blue-500/80 text-white rounded-lg hover:bg-blue-600/80 transition-all duration-200 flex items-center gap-2 text-sm font-semibold"
              title="Editar post"
            >
              ✏️ Editar
            </button>
            <button
              onClick={() => onDelete(post.post_id)}
              className="px-3 py-2 bg-red-500/80 text-white rounded-lg hover:bg-red-600/80 transition-all duration-200 flex items-center gap-2 text-sm font-semibold"
              title="Excluir post"
            >
              🗑️ Excluir
            </button>
          </div>
        )}
      </div>

      {/* Post content */}
      <h3 className="text-xl font-bold text-white mb-2">{post.titulo}</h3>
      <p className="text-white/90 mb-4 whitespace-pre-wrap">{post.conteudo}</p>

      {/* Reactions bar */}
      <div className="pt-4 border-t border-white/20">
        <ReactionPicker
          reactions={reactions}
          userReaction={userReaction}
          onReact={(reactionType) => onReact(post.post_id, reactionType)}
          totalReactions={totalReactions}
        />
        
        {/* Show who reacted */}
        {totalReactions > 0 && (
          <div className="mt-3 text-sm">
            {userReaction && (
              <p className="text-white/70 mb-1">
                Você reagiu com {REACTION_EMOJIS[userReaction]}
              </p>
            )}
            {totalReactions > 1 && (
              <p className="text-white/60">
                {totalReactions} {totalReactions === 1 ? "pessoa reagiu" : "pessoas reagiram"}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// --- LocalStorage reactions helpers ---

function getReactionsStorage() {
  try {
    const data = localStorage.getItem("post_reactions");
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function saveReactionsStorage(allReactions) {
  localStorage.setItem("post_reactions", JSON.stringify(allReactions));
}

function getReactions(postId) {
  const all = getReactionsStorage();
  const postReactions = all[postId] || {};
  // Aggregate counts by reaction type
  const counts = {};
  Object.values(postReactions).forEach(reaction => {
    counts[reaction] = (counts[reaction] || 0) + 1;
  });
  return counts;
}

function getUserReaction(postId, userId) {
  if (!userId) return null;
  const all = getReactionsStorage();
  const postReactions = all[postId] || {};
  return postReactions[userId] || null;
}
