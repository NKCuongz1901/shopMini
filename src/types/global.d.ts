export { };
declare global {
    interface IBackendRes<T> {
        success: boolean;
        message: string;
        data?: T;
    }

    interface ILogin {
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

    interface IUser {
        id: string;
        name: string;
        email: string;
        role: string
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
    } 
       