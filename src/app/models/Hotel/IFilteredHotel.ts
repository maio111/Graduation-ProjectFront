import { IFeature } from "../IFeature";
import { IFilteredRoomHotel } from "./IFilteredRoomHotel";
import { IHotelPhotoF } from "./IHotelPhotoF";

export interface IFilteredHotel {
    id: number;
    name: string;
    description: string;
    rating: number;
    cityName: string;
    price: number;
    longitude: number;
    latitude: number;
    photos: IHotelPhotoF[];
    rooms: IFilteredRoomHotel[];
    features: IFeature[];

}