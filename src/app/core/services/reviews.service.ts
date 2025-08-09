import { Injectable, OnDestroy } from "@angular/core";
import { Boat, Review } from "../../models";
import { BehaviorSubject, from, Observable, Subscription } from "rxjs";
import { dataClient } from "../utils";


@Injectable({
    providedIn: 'root'
})
export class ReviewsService {
    private client;

    constructor() {
        this.client = dataClient
    }

    listReviews(): Observable<Review[] | null> {

        return from(
            this.client.models.Reviews.list({
                selectionSet: ["id", "content", "author", "rating", "boat.id", "boat.name", "owner"],
                limit: 7
            })
                .then(({ data, errors }: { data?: any[]; errors?: any }) => {
                    if (errors) {
                        console.error("Error listing reviews:", errors);
                    }

                    return (data ?? []).map((review: any) => ({
                        id: review.id,
                        content: review.content,
                        author: review.author,
                        rating: review.rating,
                        boatId: review.boat?.id,
                        boatName: review.boat?.name,
                        owner: review.owner
                    }));
                })
        );
    }

    addReview(review: Review): Observable<Review | null> {
        return from(
            this.client.models.Reviews.create({
                content: review.content,
                author: review.author,
                rating: review.rating,
                boatId: review.boatId
            }, { authMode: "userPool" }).then(({ data, errors }: { data?: any; errors?: any }) => {
                if (errors) {
                    console.error("Error adding review:", errors);
                    return null;
                }
                if (!data) {
                    return null;
                }
                return {
                    id: data.id,
                    content: data.content,
                    author: data.author,
                    rating: data.rating,
                    boat: data.boat
                } as Review;
            })
        );
    }

    editReview(review: Review): Observable<Review | null> {
        return from<Promise<Review | null>>(
            this.client.models.Reviews.update(
                { ...review },
                { authMode: "userPool" }
            ).then(({ data, errors }: { data?: any; errors?: any }) => {
                if (errors) {
                    console.error("Error editing boat:", errors);
                    return null;
                }
                if (!data) {
                    return null;
                }
                return {
                    id: data.id,
                    content: data.content,
                    rating: data.rating,
                    author: data.author,
                } as Review;
            })
        );
    }

    deleteReview(id: string): Observable<Review | null> {
        return from(
            this.client.models.Reviews.delete({ id }, { authMode: "userPool" })
                .then(({ data, errors }: { data?: any; errors?: any }) => {
                    if (errors) {
                        console.error("Error deleting review:", errors);
                        return false;
                    }

                    return data;
                })
        );
    }

}