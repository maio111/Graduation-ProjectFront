export interface IHotelFilteredParams {
    cityId?: number;
    checkInDate?: string;
    checkOutDate?: string;
    roomTypeId?: number;
    minPrice?: number;
    maxPrice?: number;
    roomView?: string;
    roomCapacity?: number;
    featureIds?: number[];
}