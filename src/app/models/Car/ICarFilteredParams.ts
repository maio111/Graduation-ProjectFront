export interface ICarFilteredParams {
    cityId: number;
    pickUpDate: string; // ISO 8601 date string
    dropOffDate: string; // ISO 8601 date string
    description?: string;
    minPrice?: number;
    maxPrice?: number;
    gearType?: GearType;
    modelOfYear?: number;
    brand?: string;
    insuranceIncluded?: boolean;
    numberOfSeats?: number;
    agencyId?: number;
}

export enum GearType {
    Manual = 0,
    Automatic = 1
}
