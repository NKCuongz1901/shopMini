import axios from '@/services/axios.customize'
import { IProduct, ICategory, IUser, IOrder, ICreateOrderPayload } from '@/types/global';


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
    const urlBackend = `/api/v1/product/${id}`;
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

export const fetchProductByQuery = (query: string) => {
    const urlBackend = `/api/v1/product/search?${query}`;
    return axios.get<IProduct>(urlBackend);
}


export const deleteProductApi = (id: string) => {
    const urlBackend = `/api/v1/product/${id}`;
    return axios.delete<IBackendRes<IProduct>>(urlBackend);
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

export const deleteCategoryApi = (id: string) => {
    const urlBackend = `/api/v1/category/${id}`;
    return axios.delete<IBackendRes<ICategory>>(urlBackend);
}

// user
export const getListUsers = () => {
    const urlBackend = "/api/v1/auth/user";
    return axios.get<IBackendRes<IUser[]>>(urlBackend);
}

export const creatUser = (data: IUser) => {
    const urlBackend = "/api/v1/auth/user";
    return axios.post<IBackendRes<IUser>>(urlBackend, data);
}

export const updateUser = (id: string, data: IUser) => {
    const urlBackend = `/api/v1/auth/user/${id}`;
    return axios.patch<IBackendRes<IUser>>(urlBackend, data);
}

export const deleteUser = (id: string) => {
    const urlBackend = `/api/v1/auth/user/${id}`;
    return axios.delete<IBackendRes<IUser>>(urlBackend);
}

export const getUserByIdApi = (id: string) => {
    const urlBackend = `/api/v1/auth/user/${id}`;
    return axios.get<IBackendRes<IUser>>(urlBackend);
}

//order
export const getOrdersApiByIdUser = (id: string) => {
    const urlBackend = `/api/v1/order/${id}`;
    return axios.get<IBackendRes<IOrder>>(urlBackend);
}

export const getListOrders = () => {
    const urlBackend = `/api/v1/order/`;
    return axios.get<IBackendRes<IOrder[]>>(urlBackend);
}

//cart
export const addToCartApi = (data: IAddCart) => {
    const urlBackend = `/api/v1/cart`;
    return axios.post<IBackendRes<IAddCart>>(urlBackend, data);
}

export const updateToCartApi = (data: IUpdateCart) => {
    const urlBackend = `/api/v1/cart/update`;
    return axios.patch<IBackendRes<any>>(urlBackend, data);
}

export const getCartApi = (id: string) => {
    const urlBackend = `/api/v1/cart/${id}`;
    return axios.get<IBackendRes<ICart>>(urlBackend);
}

//delete cart
export const deleteCartApi = (data: ICartRemove) => {
    const urlBackend = `/api/v1/cart/remove`;
    return axios.delete<IBackendRes<any>>(urlBackend, { data });
}

export const deleteItemCartApi = (data: ICartRemoveProduct) => {
    const urlBackend = `/api/v1/cart/remove-product`;
    return axios.delete<IBackendRes<any>>(urlBackend, { data });
}

//order
export const createOrderApi = (data: ICreateOrderPayload) => {
    const urlBackend = `/api/v1/order`;
    return axios.post<IBackendRes<any>>(urlBackend, data);
}

//payment return
export const vnpayReturnApi = (data: any) => {
    const urlBackend = `/api/v1/payment/vnpay-return`;
    return axios.get<IBackendRes<any>>(urlBackend, { params: data });
}

//update order
export const updateOrderApi = (id: string, status:string) => {
    const urlBackend = `/api/v1/order/${id}`;
    return axios.put<IBackendRes<any>>(urlBackend, { status });
}
