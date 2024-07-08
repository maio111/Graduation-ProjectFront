import { ICarPhoto } from "./ICarPhoto";
import { ICarType } from "./ICarType";

export interface IFilteredCar {
  id: number;
  carAgencyId: number;
  rentPrice?: number;
  availabilityStatus?: boolean;
  plateNumber?: string;
  insuranceIncluded?: boolean;
  gearType?: GearType;
  gasType?: GasType;
  numberOfSeats?: number;
  description?: string;
  modelOfYear?: number;
  brand?: string;
  agencyName?: string;
  carType?: ICarType;
  carPhotos?: ICarPhoto[];
}

export enum GearType {
  Manual = 0,
  Automatic = 1
}

export enum GasType {
  Diesel = 0,
  BioDiesel = 1,
  Octane95 = 2
}