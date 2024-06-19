export interface GeneralResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
