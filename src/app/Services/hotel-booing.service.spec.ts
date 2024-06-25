import { TestBed } from '@angular/core/testing';

import { HotelBooingService } from './hotel-booing.service';

describe('HotelBooingService', () => {
  let service: HotelBooingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelBooingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
