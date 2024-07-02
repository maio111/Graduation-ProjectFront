import { BookingStatus } from "../Enums/BookingStatus";
export interface HotelBookingViewDTO {
    id: number;
    date: Date;
    status: BookingStatus;
    totalPrice: number;
    notes?: string;
    checkIn: Date;
    checkOut: Date;
    userFirstName: string;
    userLastName: string;
    hotelName: string;
    roomNumbers: number[];
    userId: number;
    roomId: number;
    hotelId: number;
}
