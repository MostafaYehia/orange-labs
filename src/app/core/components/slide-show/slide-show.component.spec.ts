/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import {
  SlideShowComponent,
  SlideShowItemComponent
} from "./slide-show.component";

describe("SlideShowComponent", () => {
  let slideShowComponent: SlideShowComponent;
  let slideShowItemComponent: SlideShowItemComponent;
  let fixture: ComponentFixture<SlideShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SlideShowComponent, SlideShowItemComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideShowComponent);
    slideShowComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideShowItemComponent);
    slideShowItemComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create slideShow component", () => {
    expect(slideShowComponent).toBeTruthy();
  });

  it("should create slideShow Item component", () => {
    expect(slideShowItemComponent).toBeTruthy();
  });
});
