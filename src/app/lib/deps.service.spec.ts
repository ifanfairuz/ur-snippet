import { TestBed } from '@angular/core/testing';

import { DepsService } from './deps.service';

describe('DepsService', () => {
  let service: DepsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
