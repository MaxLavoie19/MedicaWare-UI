/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Apache4Service } from './apache-4.service';

describe('Service: Apache4', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Apache4Service]
    });
  });

  it('should ...', inject([Apache4Service], (service: Apache4Service) => {
    expect(service).toBeTruthy();
  }));
});
