import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsListComponent } from './contacts/contacts-list/contacts-list.component';
import { ContactAddComponent } from './contacts/contact-add/contact-add.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'contacts-list'},
  {path: 'contacts-list', component: ContactsListComponent},
  {path: 'contact-add', component: ContactAddComponent},
  {path: 'contact-add/:id', component: ContactAddComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
