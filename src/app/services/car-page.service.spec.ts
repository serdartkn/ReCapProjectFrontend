import { TestBed } from '@angular/core/testing';

import { CarPageService } from './car-page.service';

describe('CarPageService', () => {
  let service: CarPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
