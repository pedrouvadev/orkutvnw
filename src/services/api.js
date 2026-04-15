import axios from "axios";

const api = axios.create({
   baseURL: "https://api-orkut-qe4l.onrender.com"
 });

 // Interceptor → adiciona o token automaticamente
 api.interceptors.request.use((config) => {
   const token = localStorage.getItem("token");

   if (token) {
     config.headers.Authorization = `Bearer ${token}`;
   }

   return config;
 });

 export default api;

 /**
  api.get("/posts", {
    headers: {
      Authorization = Bearer ${token}
    }
  }) 

  config = {
    url: "/posts",
    method: "get",
    headers: {}
  }
  * 
  */