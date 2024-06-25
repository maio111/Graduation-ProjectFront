import { IHotelPhotoF } from "./IHotelPhotoF";

export interface IFilteredHotel {
    id: number;
    name: string;
    description: string;
    rating: number;
    City: string;
    photos: IHotelPhotoF[];
    price: number;
}