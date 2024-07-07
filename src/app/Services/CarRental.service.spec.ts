/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CarRentalService } from './CarRental.service';

describe('Service: CarRental', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarRentalService]
    });
  });

  it('should ...', inject([CarRentalService], (service: CarRentalService) => {
    expect(service).toBeTruthy();
  }));
});
