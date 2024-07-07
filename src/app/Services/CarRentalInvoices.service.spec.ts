/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CarRentalInvoicesService } from './CarRentalInvoices.service';

describe('Service: CarRentalInvoices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarRentalInvoicesService]
    });
  });

  it('should ...', inject([CarRentalInvoicesService], (service: CarRentalInvoicesService) => {
    expect(service).toBeTruthy();
  }));
});
