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

}