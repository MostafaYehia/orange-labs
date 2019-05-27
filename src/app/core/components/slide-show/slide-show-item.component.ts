import { Component, OnInit, Input } from "@angular/core";

export interface SlideShowItem {
  bg?: string;
  headline?: string;
  description?: string;
  actionBotton?: {
    label: string;
    action: () => void;
  };
}

@Component({
  selector: "slider-item",
  templateUrl: "./slide-show-item.component.html",
  styleUrls: ["./slide-show-item.component.scss"]
})
export class SlideShowItemComponent implements OnInit {
  @Input() slide: SlideShowItem = {};
  constructor() {}

  ngOnInit() {}
}
