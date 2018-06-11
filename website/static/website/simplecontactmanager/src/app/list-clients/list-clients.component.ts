import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {ContactService} from '../contact.service';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.scss']
})
export class ListClientsComponent implements OnInit {
  displayedColumns = ['name', 'telephone', 'email', 'street', 'locality', 'postal_code', 'country', 'edit'];
  dataSource = new MatTableDataSource();
  isLoadingResults = true;
  resultsLength = 0;
  query = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router,
              private contactService: ContactService) {}

  ngOnInit() {
    // If the user changes the sort order, reset back to the first page.
    this.getClients();
  }

  applyFilter(filterValue: string) {
    this.query = filterValue;
    this.getClients();
  }
  pageChange() {
    this.getClients();
  }

  getClients() {
    this.contactService.getContacts(this.query, this.paginator.pageIndex).subscribe(data => {
      if (data != null) {
        if (data.results != null) {
          this.dataSource.data = data.results;
          this.resultsLength = data.count;
        }
      }
    });
  }

  goAddClient() {
    this.router.navigate(['add-contact']);
  }
  goEditClient(id) {
    console.log(id);
    this.router.navigate(['edit-contact'], { queryParams: { contact: id } });
  }
}
