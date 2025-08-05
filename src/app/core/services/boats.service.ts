import { Injectable, signal } from "@angular/core";
import { Boat } from "../../models";
import { from, Observable } from "rxjs";
import { dataClient } from "../utils";


@Injectable({
    providedIn: 'root'
})
export class BoatsService {
    private client;

    constructor() {
        this.client = dataClient
    }

    listBoats(): Observable<Boat[] | null> {

        return from(
            this.client.models.Boat.list({ selectionSet: ["id", "name", "content", "thumb.*", "reviews.boat.id"] })
                .then(({ data, errors }) => {
                    if (errors) {
                        console.error("Error listing boats:", errors);
                        // return data || [];
                    }

                    return (data ?? []).map((boat: any) => ({
                        id: boat.id,
                        name: boat.name ?? "",
                        content: boat.content,
                        thumb: boat.thumb,
                        location: boat.location,
                        reviews: boat.reviews
                    }));
                })
        );
    }

    addBoat(boat: Boat): Observable<Boat | null> {
        return from(
            this.client.models.Boat.create({
                name: boat.name ?? "",
                content: boat.content,
                thumb: boat.thumb,
                location: boat.location
            }, { authMode: "userPool" }).then(({ data, errors }) => {
                if (errors) {
                    console.error("Error adding boat:", errors);
                    return null;
                }
                if (!data) {
                    return null;
                }
                return {
                    id: data.id,
                    name: data.name ?? "",
                    content: data.content,
                    thumb: data.thumb,
                    location: data.location
                } as Boat;
            })
        );
    }

}