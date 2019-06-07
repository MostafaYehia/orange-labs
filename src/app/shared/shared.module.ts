import { NgModule } from "@angular/core";
import { LoginFormComponent } from "../auth/components/login-form/login-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

// Components
const COMPONENTS = [LoginFormComponent];

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent]
})
export class SharedModule {}
