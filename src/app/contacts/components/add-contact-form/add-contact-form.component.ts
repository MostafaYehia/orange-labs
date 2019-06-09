import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../../ngrx-store/reducers";
import { ContactsApiService } from "../../services/contacts-api.service";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import * as fromContacts from "../../actions/contact.actions";
import { validPhoneNumber } from 'src/app/shared/validators';

@Component({
  selector: "app-add-contact-form",
  templateUrl: "./add-contact-form.component.html",
  styleUrls: ["./add-contact-form.component.scss"]
})
export class AddContactFormComponent implements OnInit {
  addContactForm: FormGroup;
  addContactSubmited = false;
  constructor(
    private store: Store<AppState>,
    private contactsApi: ContactsApiService
  ) {}

  ngOnInit() {
    this.addContactForm = new FormGroup({
      firstName: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern("^[a-zA-Z_ ]*$")
        ])
      ),
      lastName: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern("^[a-zA-Z_ ]*$")
        ])
      ),
      email: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.email])
      ),
      phone: new FormControl(
        "",
        Validators.compose([Validators.required, Validators.maxLength(30)])
        // Validators.compose([Validators.required, Validators.maxLength(30), validPhoneNumber])
      )
    });
  }

  get addFormControls() {
    return this.addContactForm.controls;
  }

  addContact() {
    this.addContactSubmited = true;
    if (this.addContactForm.valid) {
      this.store.dispatch(
        new fromContacts.AddContact({ contact: this.addContactForm.value })
      );
      this.addContactForm.reset();
    }
  }
}
