export interface User {
    id: string;
    username: string;
    email: string;
    phone: string;
}

export interface UserLoginData {
    userId: string;
    signInDetails: {
        loginId: string;
    }
}
