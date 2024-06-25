import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function checkInDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const currentDate = new Date();
        const checkInDate = new Date(control.value);

        return checkInDate >= currentDate ? null : { invalidCheckInDate: true };
    };
}

export function checkOutDateValidator(checkInControl: AbstractControl | null): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!checkInControl) {
            return null;
        }

        const checkInDate = new Date(checkInControl.value);
        const checkOutDate = new Date(control.value);

        return checkOutDate > checkInDate ? null : { invalidCheckOutDate: true };
    };
}
