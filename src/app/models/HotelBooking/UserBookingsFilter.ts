import { BookingStatus } from "../Enums/BookingStatus";

export interface UserBookingsFilter {
    UserId: number;
    CheckIn?: Date;
    CheckOut?: Date;
    RoomNumber?: number;
    UserName?: string;
    HotelName?: string;
    Status?: BookingStatus;
    Price?: number;
}