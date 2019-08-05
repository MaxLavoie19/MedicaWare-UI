/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VisitToJsonService } from './visit-to-json.service';

describe('Service: VisitSaver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VisitToJsonService]
    });
  });

  it('should ...', inject([VisitToJsonService], (service: VisitToJsonService) => {
    expect(service).toBeTruthy();
  }));
});
