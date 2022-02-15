import { TestBed } from '@angular/core/testing';

import { DishesInfoService } from './dishes-info.service';

describe('DishesInfoService', () => {
  let service: DishesInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DishesInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
