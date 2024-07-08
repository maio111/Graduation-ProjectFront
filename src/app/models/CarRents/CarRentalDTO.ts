import { BookingStatus } from "../Enums/BookingStatus";

export interface CarRentalDTO {
    Id: number;
    UserId: number;
    UserName?: string;
    CarId: number;
    CarAgencyId: number;
    RentDate?: Date;
    Status?: BookingStatus;
    TotalPrice?: number;
    Notes?: string;
    PickUpLocation?: number;
    DropOffLocation?: number;
    PickUpDate: Date;
    DropOffDate: Date;
}
