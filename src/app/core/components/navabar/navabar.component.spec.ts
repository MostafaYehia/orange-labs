/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NavabarComponent } from './navabar.component';

describe('NavabarComponent', () => {
  let component: NavabarComponent;
  let fixture: ComponentFixture<NavabarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavabarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavabarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
