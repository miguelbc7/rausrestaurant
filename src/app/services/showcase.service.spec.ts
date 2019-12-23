import { TestBed } from '@angular/core/testing';

import { ShowcaseService } from './showcase.service';

describe('ShowcaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShowcaseService = TestBed.get(ShowcaseService);
    expect(service).toBeTruthy();
  });
});
