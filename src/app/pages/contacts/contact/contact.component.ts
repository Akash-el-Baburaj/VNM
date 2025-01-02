import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title.model';
import { Column } from 'src/app/shared/advanced-table/advanced-table.component';

import { contacts } from './data.model';
import { SortEvent } from 'src/app/shared/advanced-table/sortable.directive';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  records: any[] = [];
  columns: Column[] = [];
  searchFields = {
    name: '',
    phone: '',
    email: '',
    marriageAnniversary: '',
    lastPurchaseDate: '',
    religion: ''
  };
  uniqueReligions: any[] = []

  pageSizeOptions: number[] = [10, 25, 50, 100];

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Home', path: '/' }, { label: 'Contact', path: '/', active: true }];
    this._fetchData();
    this.initTableConfig();
    this.uniqueReligions = [
      ...new Set(contacts.map((item) => item.religion))
    ];
  }


  
  /**
   * fetches table records
   */
  _fetchData(): void {
    this.records = contacts;
  }

  initTableConfig(): void {
    this.columns = [
      {
        name: 'customerName',
        label: 'Name',
        formatter: (record: any) => record.customerName,
        width: 245,
      },
      {
        name: 'phoneNumber',
        label: 'Phone No',
        formatter: (record: any) => record.phoneNumber,
        width: 180,
      },
      {
        name: 'emailId',
        label: 'Email ID',
        formatter: (record: any) => record.emailId,
        width: 250,
      },
      {
        name: 'address',
        label: 'Address',
        formatter: (record: any) => record.address,
        width: 300,
      },
      {
        name: 'area',
        label: 'Area',
        formatter: (record: any) => record.area,
        width: 150,
      },
      {
        name: 'town',
        label: 'Town',
        formatter: (record: any) => record.town,
        width: 150,
      },
      {
        name: 'pinCode',
        label: 'Pin Code',
        formatter: (record: any) => record.pinCode,
        width: 100,
      },
      {
        name: 'dateOfBirth',
        label: 'Date of Birth',
        formatter: (record: any) => record.dateOfBirth,
        width: 150,
      },
      {
        name: 'marriageAnniversary',
        label: 'Marriage Anniversary',
        formatter: (record: any) => record.marriageAnniversary,
        width: 160,
      },
      {
        name: 'religion',
        label: 'Religion',
        formatter: (record: any) => record.religion,
        width: 120,
      },
      {
        name: 'lastPurchaseDate',
        label: 'Last Purchase Date',
        formatter: (record: any) => record.lastPurchaseDate,
        width: 200,
      },
      {
        name: 'invoiceNumber',
        label: 'Invoice Number',
        formatter: (record: any) => record.invoicenumber,
        width: 150,
      },
      {
        name: 'invoiceAmount',
        label: 'Invoice Amount',
        formatter: (record: any) => record.invoiceamount,
        width: 150,
      }

    ];
  }
  


  // compares two cell values
  compare(v1: string | number, v2: string | number): any {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  /**
   * Sort the table data
   * @param event column name, sort direction
   */
  onSort(event: SortEvent): void {
    if (event.direction === '') {
      this.records = contacts;
    } else {
      this.records = [...this.records].sort((a, b) => {
        const res = this.compare(a[event.column], b[event.column]);
        return event.direction === 'asc' ? res : -res;
      });
    }
  }

  /**
 * Table Data Match with Search input
 * @param tables Table field value fetch
 * @param term Search the value
 */
  matchesCustomerName(tables: any, term: string) {
    return tables.customerName.toLowerCase().includes(term.toLowerCase())
      // || tables.phoneNumber.toLowerCase().includes(term.toLowerCase())
      // || tables.emailId.toLowerCase().includes(term.toLowerCase())
      // || tables.marriageAnniversary.toLowerCase().includes(term.toLowerCase())
      // || tables.lastPurchaseDate.toLowerCase().includes(term.toLowerCase())
      // || tables.religion.toLowerCase().includes(term.toLowerCase());
  }
  
  matchesPhoneNumber(tables: any, term: string) {
    return tables.phoneNumber.toLowerCase().includes(term.toLowerCase())
  }

  matchesEmail(tables: any, term: string) {
    return tables.emailId.toLowerCase().includes(term.toLowerCase())
  }

  matchesMarriageAnniverssary(tables: any, term: string) {
    return tables.marriageAnniversary.toLowerCase().includes(term.toLowerCase())
  }

  matcheslastPurchaseDate(tables: any, term: string) {
    return tables.lastPurchaseDate.toLowerCase().includes(term.toLowerCase())
  }

  matchesReligion(tables: any, term: string) {
    return tables.religion.toLowerCase().includes(term.toLowerCase())
  }

  /**
   * Search Method
  */
  searchData(searchTerm: string, filterType: string): void {
    console.log('search => ', searchTerm)
    if (searchTerm === '') {  
      this._fetchData();
    }
    else {
      let updatedData = contacts;

      //  filter
      switch(filterType) {
        case 'customerName':
          updatedData = updatedData.filter(record => this.matchesCustomerName(record, searchTerm));
          break;
        case 'phoneNumber':
          updatedData = updatedData.filter(record => this.matchesPhoneNumber(record, searchTerm));
          break;
        case 'emailId':
          updatedData = updatedData.filter(record => this.matchesEmail(record, searchTerm));
          break;
        case 'marriageAnniversary':
          updatedData = updatedData.filter(record => this.matchesMarriageAnniverssary(record, searchTerm));
          break;
        case 'lastPurchaseDate':
          updatedData = updatedData.filter(record => this.matcheslastPurchaseDate(record, searchTerm));
          break;
        case 'religion':
          updatedData = updatedData.filter(record => this.matchesReligion(record, searchTerm));
          break;
        default:
          null;
          break;
                              
      }

      this.records = updatedData;
    }

  }

  resetFilter() {
    this.searchData('', '')
    this.searchFields = {
      name: '',
      phone: '',
      email: '',
      marriageAnniversary: '',
      lastPurchaseDate: '',
      religion: ''
    };
  }

  openModal(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  addCustomer(newCustomer: any) {
    const nextId = this.records.length + 1;
    const customer = {
      id: nextId,
      ...newCustomer
    };
    contacts.unshift(customer);
    this._fetchData()
  }

}
