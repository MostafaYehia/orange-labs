import { Component, OnInit, Input } from "@angular/core";
import { ContactsApiService } from "../../services/contacts-api.service";
import { NgxSmartModalService } from "ngx-smart-modal";
import { catchError, map } from "rxjs/operators";
import { of } from "rxjs";
import { ChangeDetectionStrategy } from "@angular/core";
import { AppState } from "src/app/ngrx-store/reducers";
import { Store } from "@ngrx/store";
import * as fromContacts from "../../actions/contact.actions";
@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements OnInit {
  @Input() contact = {};

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {}

  deleteContact(id) {
    this.store.dispatch(new fromContacts.DeleteContact(id));
  }
}
