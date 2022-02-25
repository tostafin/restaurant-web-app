import { TestBed } from '@angular/core/testing';

import { DishOrderService } from './dish-order.service';

describe('DishOrderService', () => {
  let service: DishOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DishOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
