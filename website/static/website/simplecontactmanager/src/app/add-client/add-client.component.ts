import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {PlaceService, AutocompletePlace, PlaceInfo} from '../place.service';
import {Contact, ContactService} from '../contact.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  myControl: FormControl = new FormControl();
  filteredOptions: Observable<AutocompletePlace[]>;
  options: AutocompletePlace[];
  selectecInfoPlace: PlaceInfo;
  contact: Contact = {
    id: -1,
    name: '',
    last_name: '',
    telephone: '',
    email: '',
    website: '',
    street: '',
    locality: '',
    postal_code: '',
    country: '',
  };
  email = new FormControl('', [Validators.required, Validators.email]);
  genericFormControl1 = new FormControl('', [Validators.required]);
  genericFormControl2 = new FormControl('', [Validators.required]);
  telephone = new FormControl('', [Validators.required]);
  genericFormControl4 = new FormControl('', [Validators.required]);
  genericFormControl5 = new FormControl('', [Validators.required]);
  genericFormControl6 = new FormControl('', [Validators.required]);
  genericFormControl7 = new FormControl('', [Validators.required]);
  genericFormControl8 = new FormControl('', [Validators.required]);

  constructor(private router: Router,
              private placeService: PlaceService,
              private contactService: ContactService,
              public snackBar: MatSnackBar,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.myControl.valueChanges.subscribe(val => {
      this.getAutocompletePlaces(val);
    });
    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        const contact_param = params['contact'] || -1;
        if (contact_param !== -1) {
          this.contactService.getContact(contact_param).subscribe(data => {
            this.contact.name = data.name;
            this.contact.last_name = data.last_name;
            this.contact.id = data.id;
            this.contact.website = data.website;
            this.contact.telephone = data.telephone;
            this.contact.email = data.email;
            this.contact.street = data.street;
            this.contact.locality = data.locality;
            this.contact.postal_code = data.postal_code;
            this.contact.country = data.country;
          }, error => {
            this.openSnackBar('No existe el contacto');
        });
        }
      });
  }

  getAutocompletePlaces(value) {
    this.placeService.getAutocompletePlaces(value).subscribe(data => {
      if (data != null) {
          this.options = data;
          this.filteredOptions = Observable.of(data);
      }
    });
  }
  onSelectionChange(event) {
    this.getPlaceInfo(event.source.value);
  }

  getPlaceInfo(place_description) {
    const place = this.options.filter(
      place_filter => place_filter.description === place_description
    )[0];
    this.placeService.getPlaceInfo(place.place_id).subscribe(data => {
      if (data != null) {
          this.contact.street = data.street;
          this.contact.locality = data.locality;
          this.contact.postal_code = data.postal_code;
          this.contact.country = data.country;
          this.selectecInfoPlace = data;
      }
    });
  }

  goListContacts() {
    this.router.navigate(['list-contacts']);
  }
  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'Valor requerido' :
        this.email.hasError('email') ? 'No es un email valido' :
            '';
  }
  getTelephoneErrorMessage() {
    return this.telephone.hasError('required') ? 'Valor requerido' :
        this.telephone.hasError('pattern') ? 'Formato no valido' :
            '';
  }

  onSubmit() {
    if (this.isValidForm()) {
      if (this.contact.id !== -1) {
        this.contactService.patchContact(this.contact).subscribe(
          data => {
            this.openSnackBar('Contacto editado');
            this.goListContacts();
        }, error => {
            this.showError(error.error);
        });
      } else {
        this.contactService.createContact(this.contact).subscribe(
          data => {
            this.openSnackBar('Contacto añadido');
            this.goListContacts();
        }, error => {
            this.showError(error.error);
        });
      }
    } else {
      this.openSnackBar('Todos los campos son necesarios');
    }
  }
  isValidForm() {
    console.log(this.contact);
    if (this.contact.name === null || this.contact.name.length <= 0 ||
        this.contact.email === null || this.contact.email.length <= 0 ||
        this.contact.street === null || this.contact.street.length <= 0 ||
        this.contact.last_name === null || this.contact.last_name.length <= 0 ||
        this.contact.locality === null || this.contact.locality.length <= 0 ||
        this.contact.postal_code === null || this.contact.postal_code.length <= 0 ||
        this.contact.telephone === null || this.contact.telephone.length <= 0 ||
        this.contact.website === null || this.contact.website.length <= 0 ||
        this.contact.country === null || this.contact.country.length <= 0) {
      return false;
    } else {
      return true;
    }
  }

  showError(error) {
    if (error.website != null) {
      this.openSnackBar('ERROR Página web:' + error.website[0]);
    } else if (error.email != null) {
      this.openSnackBar('ERROR Email:' + error.email[0]);
    } else if (error.telephone != null) {
      this.openSnackBar('ERROR teléfono:' + error.telephone[0]);
    }
  }

  openSnackBar(mesage: string) {
    this.snackBar.open(mesage, 'Aceptar', {
      duration: 4000,
    });
  }

}
