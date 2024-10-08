export interface ICarPhoto {
  id: number;
  photoUrl: string;
  category: CarPhotoCat;
  carId?: number;
}
export interface CarPhotoDTO {
  id: number;
  photo: string;
  category: CarPhotoCat;
  carId?: number;
}

export enum CarPhotoCat {
  FrontView = 0,
  BackView = 1,
  Interior = 2
}
