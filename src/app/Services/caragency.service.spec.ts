import { TestBed } from '@angular/core/testing';

import { CaragencyService } from './caragency.service';

describe('CaragencyService', () => {
  let service: CaragencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaragencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
