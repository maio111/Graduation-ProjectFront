export interface UserBookingsViewDTO{
    id: number;
    date: string;
    status: number;
    totalPrice: number;
    notes: string;
    checkIn: string;
    checkOut: string;
    hotelName: string;
    roomNumbers: number[];
}