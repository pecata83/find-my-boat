export interface User {
    id: string;
    username: string;
    email?: string;
    phone: string;
    name?: string;
    img?: string;
}

export interface UserLoginData {
    userId: string;
    signInDetails: {
        loginId: string;
    }
}
