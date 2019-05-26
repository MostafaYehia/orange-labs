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

@Component({
  selector: 'slider-item',
  templateUrl: './slide-show-item.component.html',
  styleUrls: ['./slide-show-item.component.scss']
})
export class SlideShowItemComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
