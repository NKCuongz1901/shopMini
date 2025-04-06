import axios from '@/services/axios.customize'


export const loginApi = (email: string, password: string) => {
    const urlBackend = "/api/v1/auth/login";
    return axios.post<IBackendRes<ILogin>>(urlBackend, { email, password });

}