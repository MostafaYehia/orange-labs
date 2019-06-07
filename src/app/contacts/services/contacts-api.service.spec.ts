/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ContactsApiService } from './contacts-api.service';

describe('Service: ContactsApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactsApiService]
    });
  });

  it('should ...', inject([ContactsApiService], (service: ContactsApiService) => {
    expect(service).toBeTruthy();
  }));
});
