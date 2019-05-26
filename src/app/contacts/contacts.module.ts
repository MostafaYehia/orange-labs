import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Modules
import { SharedModule } from '../shared/shared.module';

// Containers
import { ContactsPageComponent } from './containers/contacts-page/contacts-page.component';

const COMPONENTS = [ContactsPageComponent];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: ContactsPageComponent
    }]),
    // Shared Module
    SharedModule
  ],
  exports: [...COMPONENTS, RouterModule]
})
export class SearchModule { }
