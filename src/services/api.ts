import axios from '@/services/axios.customize'


export const loginApi = (email: string, password: string) => {
    const urlBackend = "/api/v1/auth/login";
    return axios.post<IBackendRes<ILogin>>(urlBackend, { email, password });

}

export const registerApi = (email: string, name: string, password: string) => {
    const urlBackend = "/api/v1/auth/register";
    return axios.post<IBackendRes<ILogin>>(urlBackend, { email, name, password });
}

export const refreshTokenApi = (refreshToken: string) => {
    const urlBackend = "/api/v1/auth/refresh";
    return axios.post(urlBackend, { refreshToken });
}

export const getMe = () => {
    const urlBackend = "api/v1/auth/me";
    return axios.get<IBackendRes<ILogin>>(urlBackend);
}