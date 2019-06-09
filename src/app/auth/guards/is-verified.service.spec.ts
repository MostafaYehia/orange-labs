/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IsVerifiedService } from './is-verified.service';

describe('Service: IsVerified', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsVerifiedService]
    });
  });

  it('should ...', inject([IsVerifiedService], (service: IsVerifiedService) => {
    expect(service).toBeTruthy();
  }));
});
