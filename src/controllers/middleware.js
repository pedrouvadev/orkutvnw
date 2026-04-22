export function onRequest(context, next) {
  // Middleware disabled - using client-side route protection with localStorage
  return next();
}
