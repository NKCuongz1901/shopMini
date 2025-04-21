import axios from '@/services/axios.customize'
import {IProduct,ICategory} from '@/types/global'; 


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

export const verifyApi = (email: string, code: string) => {
    const urlBackend = "api/v1/auth/verify";
    return axios.post(urlBackend, { email, code });
}
//products
export const getProductsApi = () => {
    const urlBackend = "/api/v1/product";
    return axios.get<IBackendRes<IProduct[]>>(urlBackend);
}
export const getProductByIdApi = (id: string) => {
    const urlBackend = `/api/v1/products/${id}`;
    return axios.get<IBackendRes<IProduct>>(urlBackend);
}
export const createProductApi = (data: IProduct) => {
    const urlBackend = "/api/v1/product";
    return axios.post<IBackendRes<IProduct>>(urlBackend, data);
}
export const updateProductApi = (id: string, data: IProduct) => {
    const urlBackend = `/api/v1/product/${id}`;
    return axios.put<IBackendRes<IProduct>>(urlBackend, data);
}

export const searchProductApi = (productName: string, minPrice: number, maxPrice: number) => {
    const urlBackend = `/api/v1/product/search?productName=${productName}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
    return axios.get<IBackendRes<IProduct[]>>(urlBackend);
}

//upload/image
export const uploadImageApi = (file: File) => {
    const urlBackend = "/api/v1/upload/image";
    const formData = new FormData();
    formData.append("file", file);
    return axios.post<IBackendRes<{ image: string }>>(urlBackend, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}

//category
export const getCategoriesApi = () => {
    const urlBackend = "/api/v1/category";
    return axios.get<IBackendRes<ICategory[]>>(urlBackend);
}
export const createCategoryApi = (data: ICategory) => {
    const urlBackend = "/api/v1/category";
    return axios.post<IBackendRes<ICategory>>(urlBackend, data);
}

export const updateCategoryApi = (id: string, data: ICategory) => {
    const urlBackend = `/api/v1/category/${id}`;
    return axios.put<IBackendRes<ICategory>>(urlBackend, data);
}