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
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response?.status === 401 && window.location.pathname !== "/auth/login" && window.location.pathname !== "/auth") { 
                localStorage.removeItem("token");
                window.location.href = "/auth/login";
            }
        }
        return Promise.reject(error);
    }
);

export default axiosClient;