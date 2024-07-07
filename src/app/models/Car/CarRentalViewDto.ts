export interface CarRentalViewDto {
    id: number;
    carAgencyName: string;
    carModel: string;
    pickUpDate: Date;
    dropOffDate: Date;
    status: number;
    totalPrice: number;
    notes: string;
}
