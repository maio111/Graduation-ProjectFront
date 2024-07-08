import { TestBed } from '@angular/core/testing';

import { CarPhotoServiceService } from './car-photo-service.service';

describe('CarPhotoServiceService', () => {
  let service: CarPhotoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarPhotoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
