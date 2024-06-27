import { TestBed } from '@angular/core/testing';

import { BraintreeService } from './braintree.service';

describe('BraintreeService', () => {
  let service: BraintreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BraintreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
