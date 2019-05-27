/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChechAuthService } from './chech-auth.service';

describe('Service: ChechAuth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChechAuthService]
    });
  });

  it('should ...', inject([ChechAuthService], (service: ChechAuthService) => {
    expect(service).toBeTruthy();
  }));
});
