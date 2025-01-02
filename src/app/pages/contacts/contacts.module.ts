import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { AdvancedTableModule } from 'src/app/shared/advanced-table/advanced-table.module';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactComponent } from './contact/contact.component';


@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    PageTitleModule,
    AdvancedTableModule,
    FormsModule,
    NgbModalModule
  ]
})
export class ContactsModule { }
