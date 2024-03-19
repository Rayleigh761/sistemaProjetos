import { TestBed } from '@angular/core/testing';

import { ServiceAnalistaService } from './service-analista.service';

describe('ServiceAnalistaService', () => {
  let service: ServiceAnalistaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceAnalistaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
