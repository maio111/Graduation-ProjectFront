import { BookingStatus } from "../Enums/BookingStatus";

export interface CreateBookingDTO {
    bookingDate: Date,
    status?: BookingStatus,
    totalPrice: number,
    notes: string,
    checkInDate: Date,
    checkOutDate: Date,
    userId: number,
    roomId: number,
    hotelId: number
}