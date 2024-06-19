import { TestBed } from '@angular/core/testing';

import { HotelPhotoService } from './hotel-photo.service';

describe('HotelPhotoService', () => {
  let service: HotelPhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelPhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
