/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CarInvoicesService } from './CarInvoices.service';

describe('Service: CarInvoices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarInvoicesService]
    });
  });

  it('should ...', inject([CarInvoicesService], (service: CarInvoicesService) => {
    expect(service).toBeTruthy();
  }));
});
