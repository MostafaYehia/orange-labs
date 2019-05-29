import { Component, AfterContentInit, OnDestroy } from "@angular/core";
import { interval, Subscription } from "rxjs";

@Component({
  selector: "slide-show",
  templateUrl: "./slide-show.component.html",
  styleUrls: ["./slide-show.component.scss"]
})
export class SlideShowComponent implements AfterContentInit, OnDestroy {
  slides = [];
  timer = interval(3000);
  subs: Subscription[] = [];
  currentSlide = 0;

  constructor() {
    this.start();
  }

  ngAfterContentInit() {
    
  }

  start() {
    this.subs.push(
      this.timer.subscribe(v => {
        if (this.currentSlide < this.slides.length - 1) this.currentSlide++;
        else this.currentSlide = 0;
      })
    );
  }

  setSlide(idx) {
    this.currentSlide = idx;
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
