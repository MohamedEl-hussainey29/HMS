import axios from "axios";


const axiosClient = axios.create({
    baseURL: "https://upskilling-egypt.com:3000/api/v0",
    timeout: 15000
});

axiosClient.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem('token');

        if(token){
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config;
    }, (error) =>{
        return Promise.reject(error);
    }
)

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthPage = window.location.pathname.startsWith("/auth");

    if (error.response?.status === 401 && !isAuthPage ) {
        localStorage.removeItem("token");
        window.location.href = "/auth/login";
    }

        return Promise.reject(error);
    }
);

export default axiosClient;