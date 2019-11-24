import { TestBed } from '@angular/core/testing';

import { FidelizacionService } from './fidelizacion.service';

describe('FidelizacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FidelizacionService = TestBed.get(FidelizacionService);
    expect(service).toBeTruthy();
  });
});
