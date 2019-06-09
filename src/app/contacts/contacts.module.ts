import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule, Route } from "@angular/router";

// Modules
import { NgxSmartModalModule } from "ngx-smart-modal";

// Containers
import { ContactsPageComponent } from "./containers/contacts-page/contacts-page.component";

// Components
import { ContactComponent } from "./components/contact/contact.component";
import { SharedModule } from "../shared/shared.module";
import { StoreModule } from "@ngrx/store";
import * as fromContact from "./reducers/contact.reducer";
import { EffectsModule } from "@ngrx/effects";
import { ContactEffects } from "./effects/contact.effects";
import { AddContactFormComponent } from "./components/add-contact-form/add-contact-form.component";
import { EditContactFormComponent } from "./components/edit-contact-form/edit-contact-form.component";

const COMPONENTS = [
  ContactsPageComponent,
  ContactComponent,
  AddContactFormComponent,
  EditContactFormComponent
];

const routes: Route[] = [
  {
    path: "",
    component: ContactsPageComponent
  }
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxSmartModalModule.forChild(),
    RouterModule.forChild(routes),
    StoreModule.forFeature("contact", fromContact.reducer),
    EffectsModule.forFeature([ContactEffects])
  ],
  exports: [...COMPONENTS, RouterModule]
})
export class ContactsModule {}
