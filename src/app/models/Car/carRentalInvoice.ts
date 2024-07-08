import { PaymentMethod, PaymentStatus } from "./CarRentalInvoiceDTO";

export interface CarRentalInvoice {
    id: number;
    number: number;
    date: Date;
    amount: number;
    status: PaymentStatus;
    transactionId?: string;
    paymentMethod: PaymentMethod;
}