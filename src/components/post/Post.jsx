import s from "./Post.module.scss";

export default function Post({ post, onEdit, onDelete }) {
  return (
    <div className={s.post}>
      <h3>{post.titulo}</h3>
      <p>{post.conteudo}</p>
      <small>Por: {post.nome}</small>

      <div className={s.actions}>
        <button onClick={() => onEdit(post)}>✏️ Editar</button>
         <button className={s.delete} onClick={() => onDelete(post.post_id)}>
          🗑️ Excluir
        </button>
      </div>
    </div>
  );
}