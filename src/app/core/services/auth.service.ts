import { inject, Injectable, signal } from "@angular/core";
import { User, UserLoginData } from "../../models";
// import { AuthenticatorService } from "@aws-amplify/ui-angular";
import { signOut } from 'aws-amplify/auth';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private _isLoggedIn = signal<boolean>(false);
    private _currentUser = signal<User | null>(null);
    private _users: User[] = []

    public isLoggedIn = this._isLoggedIn.asReadonly();
    public currentUser = this._currentUser.asReadonly();

    constructor() {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            const user = JSON.parse(savedUser);
            this._currentUser.set(user);
            this._isLoggedIn.set(true);
        }
    }

    login(data: UserLoginData): boolean {
        if (data) {
            console.log(data)
            const user = {
                id: data.userId,
                username: data.signInDetails.loginId.split('@')[0],
                email: data.signInDetails.loginId,
                phone: '+359 885 888 888'
            };

            // ToDO get user profile data drom DB
            this._currentUser.set(user);
            this._isLoggedIn.set(true);

            localStorage.setItem('currentUser', JSON.stringify(user));

            return true;
        }

        return false;
    }

    register(username: string, email: string, phone: string, password: string, rePassword: string): boolean {
        if (username && email && phone && password && rePassword) {
            const newUser: User = {
                id: `user_${Date.now()}`,
                username: username,
                email: email,
                phone: phone
            };

            this._users.push(newUser);
            this._currentUser.set(newUser);
            this._isLoggedIn.set(true);

            localStorage.setItem('currentUser', JSON.stringify(newUser));

            return true;
        }

        return false;
    }

    async logout(): Promise<void> {
        await signOut();
        this._currentUser.set(null);
        this._isLoggedIn.set(false);
        localStorage.removeItem('currentUser');
    }

    getCurrentUserId(): string | null {
        return this._currentUser()?.id || null;
    }
}
