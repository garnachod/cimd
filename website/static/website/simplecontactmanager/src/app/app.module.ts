import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatToolbarModule, MatIconModule, MatButtonModule, MatListModule, MatCardModule, MatDividerModule,
  MatLineModule, MatTableModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule, MatFormFieldModule,
  MatInputModule, MatAutocompleteModule, MatSnackBarModule} from '@angular/material';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AddClientComponent } from './add-client/add-client.component';
import { ListClientsComponent } from './list-clients/list-clients.component';
import {ContactService} from './contact.service';
import {PlaceService} from './place.service';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    AppComponent,
    AddClientComponent,
    ListClientsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatLineModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatSnackBarModule,
  ],
  providers: [
    ContactService,
    PlaceService,
    {provide: APP_BASE_HREF, useValue: '/'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
