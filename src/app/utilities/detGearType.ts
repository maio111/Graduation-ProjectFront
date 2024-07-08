import { GearType } from "../models/Car/ICarFilteredParams";

export const getGearTypeValues = () => {
    return Object.keys(GearType)
        .filter(key => !isNaN(Number(GearType[key as any])))
        .map(key => ({ label: key, value: GearType[key as any] as unknown as number }));
};

export function getGearTypeLabel(value: number): string {
    return GearType[value] || 'Unknown';
}