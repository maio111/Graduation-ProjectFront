import { PaymentMethod } from "../Enums/PaymentMethod";

export interface ViewInvoiceDTO {
    id: number;
    number: number;
    date: Date;
    amount: number;
    paymentStatus: string;
    transactionId?: string;
    paymentMethod: PaymentMethod;
}
