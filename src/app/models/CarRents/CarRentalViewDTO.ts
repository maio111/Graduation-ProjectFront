import { BookingStatus } from '../Enums/BookingStatus';

export interface CarRentalViewDTO {
    id: number;
    pickUpCity: string;
    userFirstName: string;
    userLastName: string;
    carAgencyName: string;
    pickUpDate: Date;
    dropOffDate: Date;
    status: BookingStatus;
    totalPrice: number;
    brand: string;
    notes: string;
}
