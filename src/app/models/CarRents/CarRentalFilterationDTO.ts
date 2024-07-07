export interface CarRentalFilterationDTO {
    pickUpCity: string;
    pickUpDate: Date | undefined;
    dropOffDate: Date | undefined;
    minPrice?: number;
    maxPrice?: number;
    gearType?: number;
    modelOfYear?: number;
    brand?: string;
    numberOfSeats?: number;
    agencyId?: number;
}
