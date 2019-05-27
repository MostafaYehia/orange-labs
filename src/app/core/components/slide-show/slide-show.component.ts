import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'slide-show',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./slide-show.component.scss']
})
export class SlideShowComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
