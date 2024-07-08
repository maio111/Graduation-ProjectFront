import { RentalStatus } from "../../utilities/RentalStatus";

export enum PaymentStatus {
    Pending = 0,
    Completed = 1,
    Failed = 2,
  }
  
  export enum PaymentMethod {
    CreditCard = 0,
    PayPal = 1,
    BankTransfer = 2,
  }
  
  export interface CarRentalInvoiceDTO {
    id: number;
    number: number;
    date: Date;
    amount: number;
    paymentStatus: RentalStatus;
    transactionId: number;
    paymentMethod: PaymentMethod;
    userId: number;
    carRentalId: number;
  }