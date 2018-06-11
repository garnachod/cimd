import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddClientComponent } from './add-client/add-client.component';
import {ListClientsComponent } from './list-clients/list-clients.component';

const routes: Routes = [
  {path: 'add-contact', component: AddClientComponent},
  {path: 'edit-contact', component: AddClientComponent},
  {path: 'list-contacts', component: ListClientsComponent},
  { path: '',   redirectTo: 'list-contacts', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
