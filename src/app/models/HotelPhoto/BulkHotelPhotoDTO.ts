import { PhotoCategory } from "../Enums/PhotoCategory";
import { addPhoto } from "../addPhoto";

export interface BulkHotelPhotoDTO {
    photos: File[];
    category: PhotoCategory;
}