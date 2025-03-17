import axios from "axios";



// 创建axios实例
const service = axios.create({
  baseURL: "/api", // 修改这里的端口号
  timeout: 5000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // 例如：添加token
    // const token = localStorage.getItem('token');
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 对响应数据做些什么
    return response.data;
  },
  error => {
    // 对响应错误做些什么
    if (error.response) {
      // 根据不同的状态码进行处理
      switch (error.response.status) {
        case 401:
          // 例如：未授权，跳转到登录页面
          console.error('Unauthorized, redirecting to login...');
          break;
        case 404:
          console.error('Resource not found');
          break;
        default:
          console.error('Request failed:', error.response.data);
      }
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.error('No response received:', error.request);
    } else {
      // 其他错误
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default service;