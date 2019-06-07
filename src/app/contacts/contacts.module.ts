import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

// Modules

// Containers
import { ContactsPageComponent } from './containers/contacts-page/contacts-page.component';

const COMPONENTS = [ContactsPageComponent];

const routes: Route[] = [{
    path: '',
    component: ContactsPageComponent
}]

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [...COMPONENTS, RouterModule]
})
export class ContactsModule { }
