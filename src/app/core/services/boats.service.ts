import { Injectable, signal } from "@angular/core";
import { AuthService } from "./auth.service";
import { User } from "../../models";
import { from, Observable } from "rxjs";
import { dataClient } from "../utils";


@Injectable({
    providedIn: 'root'
})
export class BoatsService {
    private currentUser = signal<User | null>(null);
    private _userProfile = signal<any>(null);
    private client;

    constructor(private authService: AuthService) {
        this.client = dataClient
        this.currentUser.set(this.authService.currentUser());
    }

    public userProfile = this._userProfile.asReadonly();

    listBoats(): Observable<any[] | null> {
        const user = this.currentUser();
        if (!user) {
            throw new Error("No user is currently logged in.");
        }
        return from(
            this.client.models.Boat.list()
                .then(({ data, errors }) => {
                    if (errors) {
                        console.error("Error listing boats:", errors);
                        return data || [];
                    }
                    console.error("data", data);
                    return data ?? [];
                })
        );
    }

}