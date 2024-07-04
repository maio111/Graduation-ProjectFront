export interface IAddHotelReviewDTO {
    userId: number;
    comment?: string; 
    hotelId?: number; 
    reviewDate: Date;
}