import { TestBed } from '@angular/core/testing';

import { WishListHotelService } from './wish-list-hotel.service';

describe('WishListHotelService', () => {
  let service: WishListHotelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishListHotelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
