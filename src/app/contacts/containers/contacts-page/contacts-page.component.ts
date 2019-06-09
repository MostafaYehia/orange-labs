import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, of, Subscription } from "rxjs";
import { ContactsApiService } from "../../services/contacts-api.service";
import { NgxSmartModalService } from "ngx-smart-modal";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { map, catchError } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { AppState } from "src/app/ngrx-store/reducers";
import { Store } from "@ngrx/store";
import * as fromContacts from "../../actions/contact.actions";
import { getAllContacts, getTotalPagesCount } from "../../selectors";

@Component({
  selector: "app-contacts-page",
  templateUrl: "./contacts-page.component.html",
  styleUrls: ["./contacts-page.component.scss"]
})
export class ContactsPageComponent implements OnInit, OnDestroy {
  contacts$: Observable<any>;
  totalPages: number = 0;
  currentPage = 1;
  sortBy = "firstName";
  addContactForm: FormGroup;
  addContactSubmited = false;
  subs: Subscription[] = [];

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    private activeRoute: ActivatedRoute,
    private store: Store<AppState>,
    private contactsApi: ContactsApiService
  ) {}

  get addFormControls() {
    return this.addContactForm.controls;
  }

  ngOnInit() {
    const snapShopt = this.activeRoute.snapshot;
    this.currentPage = +snapShopt.queryParams["page"] || 1;
    this.sortBy = snapShopt.queryParams["sortBy"] || "firstName";

    // Set sort by state on initialization
    this.store.dispatch(new fromContacts.SortType(this.sortBy));
  
    // Load contacts
    this.loadPage();


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

    // Get Contacts
    this.contacts$ = this.store.select(getAllContacts);

    // Get Totla Pages state
    this.subs.push(
      this.store
        .select(getTotalPagesCount)
        .subscribe(count => (this.totalPages = count))
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

  nextPage() {
    this.currentPage++;

    if (this.currentPage > this.totalPages)
      return (this.currentPage = this.totalPages);
    this.loadPage();
  }

  prevPage() {
    this.currentPage--;
    if (this.currentPage < 1) return (this.currentPage = 1);
    this.loadPage();
  }

  private loadPage() {
    const isLoaded = this.contactsApi.loadedPages.includes(this.currentPage);
    if (!isLoaded) {
      // Load contacts
      this.store.dispatch(new fromContacts.LoadContacts(this.currentPage));
      // Save loaded contacts state
      this.contactsApi.loadedPages.push(this.currentPage);
    }
    // Set current page
    this.store.dispatch(new fromContacts.CurrentPage(this.currentPage));
  }

  sortContacts() {
    this.store.dispatch(new fromContacts.SortType(this.sortBy));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
