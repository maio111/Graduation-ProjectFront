import { PaymentMethod } from '../models/Enums/PaymentMethod';

export const PaymentMethodLabels: { [key in PaymentMethod]: string } = {
    [PaymentMethod.CreditCard]: 'Credit Card',
    [PaymentMethod.DebitCard]: 'Debit Card',
    [PaymentMethod.PayPal]: 'PayPal',
    [PaymentMethod.BankTransfer]: 'Bank Transfer',
    [PaymentMethod.Cash]: 'Cash'
};

export const getPaymentMethodsValues = () => {
    return Object.keys(PaymentMethod)
        .filter(key => !isNaN(Number(key))) // filter out string keys if PaymentMethod is a numeric enum
        .map(key => ({ label: PaymentMethodLabels[key as unknown as PaymentMethod], value: Number(key) }));
};

export function getPaymentMethodLabel(value: number): string {
    return PaymentMethodLabels[value as PaymentMethod] || 'Unknown';
}
