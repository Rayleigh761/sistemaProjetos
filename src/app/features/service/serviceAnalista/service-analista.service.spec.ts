import { TestBed } from '@angular/core/testing';

import { ServiceAnalista } from './service-analista.service';

describe('ServiceAnalista', () => {
  let service: ServiceAnalista;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceAnalista);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
