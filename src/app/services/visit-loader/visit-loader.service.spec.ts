/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VisitLoaderService } from './visit-loader.service';

describe('Service: VisitLoader', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VisitLoaderService]
    });
  });

  it('should ...', inject([VisitLoaderService], (service: VisitLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
