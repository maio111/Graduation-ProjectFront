import { TestBed } from '@angular/core/testing';

import { TokenValidationService } from './token-validation.service';

describe('TokenValidationService', () => {
  let service: TokenValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
