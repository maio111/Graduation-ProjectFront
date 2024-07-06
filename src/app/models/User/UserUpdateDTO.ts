export interface UserUpdateDTO {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    gender?: string;
    address?: string;
    photo?: File;
    birthDate?: Date;
    cityId?: number;
}
