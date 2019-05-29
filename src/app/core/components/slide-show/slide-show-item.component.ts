import { Component, OnInit, Input } from "@angular/core";
import { fadeSlideIn } from "src/app/shared/animations";

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
  styleUrls: ["./slide-show-item.component.scss"],
  animations: [fadeSlideIn("fadeInSlide", 2)]
})
export class SlideShowItemComponent implements OnInit {
  @Input() slide: SlideShowItem = {};
  constructor() {}

  ngOnInit() {}
}
