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
import { fadeInUp } from "../../../shared/animations";

@Component({
  selector: "app-contacts-page",
  templateUrl: "./contacts-page.component.html",
  styleUrls: ["./contacts-page.component.scss"],
  animations: [fadeInUp("showContactsAnim", 0.7)]
})
export class ContactsPageComponent implements OnInit, OnDestroy {
  contacts: any[] = [];
  totalPages: number = 0;
  currentPage = 1;
  sortBy = "firstName";
  subs: Subscription[] = [];

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    private activeRoute: ActivatedRoute,
    private store: Store<AppState>,
    private contactsApi: ContactsApiService
  ) {}

  ngOnInit() {
    const snapShopt = this.activeRoute.snapshot;
    this.currentPage = +snapShopt.queryParams["page"] || 1;
    this.sortBy = snapShopt.queryParams["sortBy"] || "firstName";

    // Set sort by state on initialization
    this.store.dispatch(new fromContacts.SortType(this.sortBy));

    // Load contacts
    this.loadCurrentPage();

    this.subs.push(
      // Get Contacts
      this.store.select(getAllContacts).subscribe(contacts => {
        this.contacts = [];
        setTimeout(() => {
          this.contacts = [...contacts]
        }, 0);
      })
    );

    this.subs.push(
      // Get Totla Pages state
      this.store
        .select(getTotalPagesCount)
        .subscribe(count => (this.totalPages = count))
    );
  }

  nextPage() {
    this.currentPage++;

    if (this.currentPage > this.totalPages)
      return (this.currentPage = this.totalPages);
    this.loadCurrentPage();
  }

  prevPage() {
    this.currentPage--;
    if (this.currentPage < 1) return (this.currentPage = 1);
    this.loadCurrentPage();
  }

  private loadCurrentPage() {
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
