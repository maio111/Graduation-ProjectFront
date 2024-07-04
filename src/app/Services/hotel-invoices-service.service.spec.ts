import { TestBed } from '@angular/core/testing';

import { HotelInvoicesServiceService } from './hotel-invoices-service.service';

describe('HotelInvoicesServiceService', () => {
  let service: HotelInvoicesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelInvoicesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
