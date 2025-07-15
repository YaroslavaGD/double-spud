import { TestBed } from '@angular/core/testing';

import { CardControllerService } from './card-controller.service';

describe('CardControllerService', () => {
  let service: CardControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
