import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

// Components
import { NavabarComponent } from "../core/components/navabar/navabar.component";
import { CommonModule } from "@angular/common";

// Components
const COMPONENTS = [NavabarComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, RouterModule],
  exports: [...COMPONENTS]
})
export class SharedModule {}
