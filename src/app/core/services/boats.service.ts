import { Injectable, OnDestroy } from "@angular/core";
import { Boat } from "../../models";
import { BehaviorSubject, from, map, Observable, Subscription } from "rxjs";
import { dataClient } from "../utils";
import { Schema } from "../../../../amplify/data/resource";

@Injectable({
    providedIn: 'root'
})
export class BoatsService implements OnDestroy {
    private client;
    private boatSubject = new BehaviorSubject<Schema['Boat']['type'][]>([]);
    boats$: Observable<Schema['Boat']['type'][]> = this.boatSubject.asObservable();
    subscription?: Subscription;

    constructor() {
        this.client = dataClient
    }

    startObservingMyBoats({ userId }: { userId: string }): void {
        this.subscription = this.client.models.Boat.observeQuery(
            {
                selectionSet: ["id", "name", "content", "thumb.*", "owner", "reviews.id", "createdAt", "updatedAt"],
                authMode: "userPool",
                filter: { owner: { eq: `${userId}::${userId}` } }
            },
        ).subscribe({
            next: ({ items }) => {
                this.boatSubject.next(
                    items.map((boat: any) => ({
                        ...boat,
                        createdAt: boat.createdAt ?? '',
                        updatedAt: boat.updatedAt ?? ''
                    }))
                );
            },
            error: (err) => console.error('Boat subscription error:', err),
        });
    }

    startObservingBoats(): void {
        this.subscription = this.client.models.Boat.observeQuery({ selectionSet: ["id", "name", "content", "location.*", "thumb.*", "owner", "reviews.id", "createdAt", "updatedAt"] }).subscribe({
            next: ({ items }) => {
                this.boatSubject.next(
                    items.map((boat: any) => ({
                        ...boat,
                        createdAt: boat.createdAt ?? '',
                        updatedAt: boat.updatedAt ?? ''
                    }))
                );
            },
            error: (err) => console.error('Boat subscription error:', err),
        });
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    listBoats(): Observable<Boat[] | null> {

        return from(
            this.client.models.Boat.list({ selectionSet: ["id", "name", "content", "thumb.*", "owner", "reviews.boat.id"] })
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
                        reviews: boat.reviews,
                        owner: boat.owner
                    }));
                })
        );
    }

    listMyBoats(): Observable<Boat[] | null> {

        return from(
            this.client.models.Boat.list({
                selectionSet: ["id", "name", "content", "thumb.*", "owner", "reviews.boat.id"],
                authMode: "userPool"
            })
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
                        reviews: boat.reviews,
                        owner: boat.owner
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

    getBoat(id: string): Observable<Boat | null> {
        return from(
            this.client.models.Boat.get({ id }, { selectionSet: ["id", "name", "content", "thumb.*", "owner", "reviews.boat.id", "reviews.boat.name", "reviews.author", "reviews.content", "reviews.id", "reviews.rating", "reviews.owner", "location.*", "anchorRadius", "anchorLocation.*"] })
                .then(({ data, errors }) => {
                    if (errors) {
                        console.error("Error fetching boat:", errors);
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
                        location: data.location,
                        reviews: data.reviews,
                        owner: data.owner,
                        anchorRadius: data.anchorRadius,
                        anchorLocation: data.anchorLocation
                    } as Boat;
                })
        );
    }

    editBoat(boat: Boat): Observable<Boat | null> {
        return from(
            this.client.models.Boat.update(
                { id: boat.id as string, ...boat },
                { authMode: "userPool" }
            ).then(({ data, errors }) => {
                if (errors) {
                    console.error("Error editing boat:", errors);
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
                    location: data.location,
                    // reviews: data.reviews,
                    owner: data.owner
                } as Boat;
            })
        );
    }

    deleteBoat(id: string): Observable<boolean> {
        return from(
            this.client.models.Boat.delete({ id }, { authMode: "userPool" })
                .then(({ data, errors }) => {
                    if (errors) {
                        console.error("Error deleting boat:", errors);
                        return false;
                    }
                    return true;
                })
        );
    }

}