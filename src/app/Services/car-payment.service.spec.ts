import { TestBed } from '@angular/core/testing';

import { CarPaymentService } from './car-payment.service';

describe('CarPaymentService', () => {
  let service: CarPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
