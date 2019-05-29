import { Directive, TemplateRef } from '@angular/core';
import { SlideShowComponent } from './slide-show.component';
import { interval } from 'rxjs'
@Directive({
  selector: '[slideBlueprint]'
})
export class SlideBlueprintDirective {


  constructor(templateRef: TemplateRef<void>, slideShow: SlideShowComponent) {
    slideShow.slides.push(templateRef);
  }



}
