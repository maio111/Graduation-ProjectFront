export interface IHotelFilteredParams {
    cityId?: number;
    checkInDate: string;
    checkOutDate: string;
    roomTypeId?: number;
    minPrice?: number;
    maxPrice?: number;
    roomView?: number;
    roomCapacity?: number;
    featureIds?: number[];
}