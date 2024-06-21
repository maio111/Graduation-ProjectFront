import { View } from "../models/Enums/View";
export const getViewsValues = () => {
    return Object.keys(View)
        .filter(key => !isNaN(Number(View[key as any])))
        .map(key => ({ label: key, value: View[key as any] as unknown as number }));
};
export function getViewLabel(value: number): string {
    return View[value] || 'Unknown';
}