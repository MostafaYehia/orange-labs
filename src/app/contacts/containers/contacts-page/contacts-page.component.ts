import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { ContactsApiService } from "../../services/contacts-api.service";
import { NgxSmartModalService } from "ngx-smart-modal";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { map, catchError } from "rxjs/operators";
import {  ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-contacts-page",
  templateUrl: "./contacts-page.component.html",
  styleUrls: ["./contacts-page.component.scss"]
})
export class ContactsPageComponent implements OnInit {
  contacts$: Observable<any>;
  currentPage = 1;
  sortBy = "firstName";
  addContactForm: FormGroup;
  addContactSubmited = false;

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    private activeRoute: ActivatedRoute,
    private contactsApi: ContactsApiService
  ) {}

  get addFormControls() {
    return this.addContactForm.controls;
  }

  ngOnInit() {
    this.currentPage = this.activeRoute.snapshot.queryParams['page'] || 1;
    this.sortBy = this.activeRoute.snapshot.queryParams['sortBy'] || 'firstName';

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
      )
    });

    this.contacts$ = this.contactsApi.getContacts(
      this.currentPage,
      'firstName'
    );
  }

  addContact() {
    this.addContactSubmited = true;
    if (this.addContactForm.valid) {
      const sub = this.contactsApi
        .createContact(this.addContactForm.value)
        .pipe(
          map((res: any) => {
            console.log("New Contact has been added successfully!", res);
          }),
          catchError(err => {
            console.log("Error while creating new contact", err);
            return of(err);
          })
        )
        .subscribe((res: any) => {
          sub.unsubscribe();
        });
    }
  }

  sortContacts() {
    console.log("sort by: ", this.sortBy)
  }
}
