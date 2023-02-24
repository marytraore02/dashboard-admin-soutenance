import { TestBed } from '@angular/core/testing';

import { CliniqueService } from './clinique.service';

describe('CliniqueService', () => {
  let service: CliniqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CliniqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
