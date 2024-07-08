import { BookingStatus } from '../models/Enums/BookingStatus';

export const BookingStatusLabels: { [key in BookingStatus]: string } = {
    [BookingStatus.Pending]: 'Pending',
    [BookingStatus.Confirmed]: 'Confirmed',
    [BookingStatus.Cancelled]: 'Cancelled',
    [BookingStatus.Completed]: 'Completed',
};
export const getBookingStatusesValues = () => {
    return Object.keys(BookingStatus)
        .filter(key => !isNaN(Number(BookingStatus[key as any])))
        .map(key => ({ label: key, value: BookingStatus[key as any] as unknown as number }));
};
export function getBookingStatusesLabel(value: number): string | null {
    return BookingStatus[value] || 'Unknown';
}