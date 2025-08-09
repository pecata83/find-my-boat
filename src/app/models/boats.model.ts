export type Location = {
    lat: number;
    lng: number;
}

export type Thumb = {
    src: string;
    title?: string;
}

export type Review = {
    id: string;
    author?: string;
    content?: string;
    rating?: string;
    boatId?: string;
}

export interface Boat {
    id?: string;
    name: string;
    content?: string;
    thumb?: Thumb;
    location?: Location
    reviews?: Review[];
    owner?: string;
}