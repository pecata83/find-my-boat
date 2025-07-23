import { Injectable, signal } from "@angular/core";
import { type Schema } from '../../../../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';
import { AuthService } from "./auth.service";
import { User } from "../../models";
const client = generateClient<Schema>();



@Injectable({
    providedIn: 'root'
})
export class UserProfileService {
    private currentUser = signal<User | null>(null);
    private _userProfile = signal<any>(null);

    constructor(private authService: AuthService) {
        this.currentUser.set(this.authService.currentUser());
        this.getUserData();
    }

    public userProfile = this._userProfile.asReadonly();

    getUserData(): void {
        const user = this.currentUser();
        if (user) {
            client.models.UserProfile.get({
                profileOwner: user.id + "::" + user.id
            }, { authMode: "userPool" }).then(({ data, errors }) => {
                if (errors) {
                    console.error("Error fetching user profile:", errors);
                    this._userProfile.set(null);
                    return;
                }
                this._userProfile.set(data);
                console.log("User data:", this._userProfile());
            }).catch((err) => {
                console.error("Unexpected error fetching user profile:", err);
                this._userProfile.set(null);
            });

        } else {
            throw new Error("Error getting current user");
        }
    }
}