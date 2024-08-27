import { CarPhotoCategories } from "../Enums/CarPhotoCategories";
export interface BulkCarPhotoDTO {
    photos: File[];
    category: CarPhotoCategories;
}