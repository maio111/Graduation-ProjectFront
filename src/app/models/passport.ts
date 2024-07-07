export interface Passport {
    id: number;
    firstName?: string;
    lastName?: string;
    nid: string;
    passportNumber: string;
    issuingCountry?: string;
    expiryDate: Date;
}
