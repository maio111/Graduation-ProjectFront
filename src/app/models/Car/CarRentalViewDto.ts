import { RentalStatus } from "../../utilities/RentalStatus";
import { CarRentalInvoice } from "./carRentalInvoice";
import { PaymentStatus } from "./CarRentalInvoiceDTO";

export interface CarRentalViewDto {
    id: number;
    carAgencyName: string;
    carModel: string;
    pickUpDate: Date;
    dropOffDate: Date;
    status: PaymentStatus;
    totalPrice: number;
    notes: string;
    carRentalInvoice:CarRentalInvoice
}
