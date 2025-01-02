import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [ 
  { path: 'contact', loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule) },
  { path: '', redirectTo: 'contact', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
