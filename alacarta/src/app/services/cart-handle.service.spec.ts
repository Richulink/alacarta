import { TestBed } from '@angular/core/testing';

import { CartHandleService } from './cart-handle.service';

describe('CartHandleService', () => {
  let service: CartHandleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartHandleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
