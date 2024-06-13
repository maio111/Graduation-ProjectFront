export interface RoomsViewDTO {
    id: number;
    availabilityStatus: boolean;
    capacity: number;
    view: number;
    typeName: string;
    hotelName: string;
    pricePerNight: number;
    isBooked: boolean;
}