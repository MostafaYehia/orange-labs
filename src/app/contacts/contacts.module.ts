import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';

// Modules
import { NgxSmartModalModule } from "ngx-smart-modal";

// Containers
import { ContactsPageComponent } from './containers/contacts-page/contacts-page.component';

// Components
import { ContactComponent } from './components/contact/contact.component';
import { SharedModule } from '../shared/shared.module';

const COMPONENTS = [ContactsPageComponent, ContactComponent];

const routes: Route[] = [{
    path: '',
    component: ContactsPageComponent
}]

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxSmartModalModule.forChild(),
    RouterModule.forChild(routes)
  ],
  exports: [...COMPONENTS, RouterModule]
})
export class ContactsModule { }
