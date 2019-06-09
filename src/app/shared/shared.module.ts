import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { LoadingIconComponent } from './components/loading-icon/loading-icon.component';

// Components
import { NavabarComponent } from "../core/components/navabar/navabar.component";
import { CommonModule } from "@angular/common";

// Components
const COMPONENTS = [NavabarComponent, LoadingIconComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, RouterModule],
  exports: [...COMPONENTS]
})
export class SharedModule {}
