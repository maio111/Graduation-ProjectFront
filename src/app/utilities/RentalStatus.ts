
export enum RentalStatus {
    Pending = 1,
    Confirmed,
    Canceled,
    Completed
  }
  
  export const RentalStatusLabels: Record<RentalStatus, string> = {
    [RentalStatus.Pending]: 'Pending',
    [RentalStatus.Confirmed]: 'Confirmed',
    [RentalStatus.Canceled]: 'Canceled',
    [RentalStatus.Completed]: 'Completed'
  };
  
  export function getRentalStatusesValues() {
    return Object.keys(RentalStatusLabels).map(key => ({
      label: RentalStatusLabels[key as unknown as RentalStatus],
      value: +key
    }));
  }
 