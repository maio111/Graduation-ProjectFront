import { IHotelPhotoF } from "./IHotelPhotoF";

export interface IWishlistHotelDTO {
        id: number;
        name?: string;
        description?: string;
        cityName?: string;
        price?: number;
        photos?: IHotelPhotoF[];
}
