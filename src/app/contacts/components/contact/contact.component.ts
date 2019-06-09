import { Component, OnInit, Input } from "@angular/core";
import { ContactsApiService } from "../../services/contacts-api.service";
import { NgxSmartModalService } from "ngx-smart-modal";
import { catchError, map } from "rxjs/operators";
import { of } from "rxjs";
import { ChangeDetectionStrategy } from '@angular/core';

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
    private contactsApi: ContactsApiService
  ) {}


  ngOnInit() {
  
  }


  deleteContact() {
    const sub = this.contactsApi
      .deleteContact(this.contact["_id"])
      .pipe(
        map((res: any) => {
          console.log("Contact has been deleted successfully");
        }),
        catchError(err => {
          console.log("Deleteing contact erro", err);
          return of(err);
        })
      )
      .subscribe((res: any) => {
        sub.unsubscribe();
      });
  }
}
