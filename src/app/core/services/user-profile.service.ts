import { Injectable, signal } from "@angular/core";
import { AuthService } from "./auth.service";
import { User } from "../../models";
import { from, Observable } from "rxjs";
import { dataClient } from "../utils";



@Injectable({
    providedIn: 'root'
})
export class UserProfileService {
    private currentUser = signal<User | null>(null);
    private _userProfile = signal<User | null>(null);
    private client;

    constructor(private authService: AuthService) {
        this.client = dataClient
        this.currentUser.set(this.authService.currentUser());
        this.getUserData();
    }

    public userProfile = this._userProfile.asReadonly();

    getUserData(): void {
        const user = this.currentUser();
        if (user) {
            this.client.models.UserProfile.get({
                profileOwner: user.id + "::" + user.id
            }, { authMode: "userPool" }).then(({ data, errors }) => {
                if (errors) {
                    this._userProfile.set(null);
                    return;
                }
                if (data) {
                    const mappedUser: User = {
                        id: user.id,
                        username: user.username,
                        phone: user.phone,
                        name: data.name ?? undefined,
                        email: data.email ?? undefined,
                        img: data.img ?? undefined,
                    };
                    this._userProfile.set(mappedUser);
                } else {
                    this._userProfile.set(null);
                }
            }).catch((err) => {
                console.error("Unexpected error fetching user profile:", err);
                this._userProfile.set(null);
            });

        } else {
            // throw new Error("Error getting current user");
            console.log("Error getting current user");
        }
    }

    updateProfile(profileData: User): Observable<User | null> {
        const user = this.currentUser();
        if (!user) {
            throw new Error("No user is currently logged in.");
        }

        return from(
            this.client.models.UserProfile.update({
                profileOwner: user.id + "::" + user.id,
                ...profileData
            }, { authMode: "userPool" })
                .then(({ data, errors }) => {
                    if (errors) {
                        console.error("Error updating user profile:", errors);
                        return null;
                    }
                    if (!data) {
                        return null;
                    }
                    // Map the returned data to User type
                    const mappedUser: User = {
                        id: user.id,
                        username: user.username,
                        phone: user.phone,
                        name: data.name ?? undefined,
                        email: data.email ?? undefined,
                        img: data.img ?? undefined,
                    };

                    this._userProfile.set(mappedUser);
                    return mappedUser;
                })
        );

    }

}