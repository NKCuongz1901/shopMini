import exp from "constants";

export { };
declare global {
    interface IBackendRes<T> {
        success: boolean;
        message: string;
        data?: T;
    }

    interface ILogin {
        data:{
            tokens: {
                access_token: string;
                refresh_token: string;
            },
            user: {
                id: string;
                name: string;
                email: string;
                role: string
            }
        }
    }
    interface IAddCart{
        userId: string;
        productId: string;
        quantity: number;
    }
    interface IUpdateCart{
        userId: string;
        productId: string;
        quantity: number;
    }
    interface ICart{
        _id: string;
        userId: string;
        items:string[];
        totalPrice: number;
    }
    interface ICartRemove{
        userId: string;
    }
    interface ICartRemoveProduct{
        userId: string;
        productId: string;
    }
    
   

}

export interface IProduct {
        _id: string;
        productName: string;
        category: string;
        quantity: number;
        image: string;
        price: number;
        description: string;
    }

export interface ICategory {
        _id: string;
        name: string;
        slug: string;
        parentId: string;
        description: string;
        priority: number;
        type: string;
    } 

    export interface IUser {
        _id: string;
        name: string;
        email: string;
        password?: string;
        address: string;
        role: string;
    }

    export interface IOrder {
        _id: string;
        userId: string;
        items : IProduct[];
        totalPrice: number;
        paymentMethod: string;
        shippingAddress: string;
        phone: string;
        status: string;
    }

    // 👇 Interface đúng với request body backend mong muốn
export interface ICreateOrderPayload {
  userId: string;
  shippingAddress: string;
  phone: string;
  paymentMethod: string;
  productIds: string[];
}
