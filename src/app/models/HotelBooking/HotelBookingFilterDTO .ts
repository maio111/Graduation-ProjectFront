import { BookingStatus } from "../Enums/BookingStatus";

export interface HotelBookingFilterDTO {
    checkIn?: Date;
    checkOut?: Date;
    roomNumber?: number;
    userName?: string;
    hotelName?: string;
    status?: BookingStatus;
    price?: number;
}