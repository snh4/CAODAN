// api.js
import axios from 'axios';

const apiUrl = 'http://localhost:8000/api';

const api  = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});
api.interceptors.request.use(
      (config) => {
        console.log('Request interceptor triggered');
        if (config.path === '/') {
          // 处理根路径的逻辑
        } else {
          const token = sessionStorage.getItem('token');
          console.log('Token:', token);
          // 在请求头加入 token，名字要和后端接收请求头的 token 名字一样    
          config.headers['Authorization'] = `${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
// api.interceptors
//在这里写全局拦截请求器
export default api;
