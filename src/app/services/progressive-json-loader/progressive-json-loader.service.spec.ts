/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProgressiveJsonLoaderService } from './progressive-json-loader.service';

describe('Service: ProgressiveJsonLoader', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProgressiveJsonLoaderService]
    });
  });

  it('should ...', inject([ProgressiveJsonLoaderService], (service: ProgressiveJsonLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
