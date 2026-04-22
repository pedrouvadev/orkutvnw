export function formatDate(dateString) {
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
}
