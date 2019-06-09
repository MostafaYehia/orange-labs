import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as fromContacts from "../actions/contact.actions";
import { Observable, of } from "rxjs";
import { Action } from "@ngrx/store";
import { switchMap, map, catchError } from "rxjs/operators";
import { ContactsApiService } from "../services/contacts-api.service";
import { NgxSmartModalService } from "ngx-smart-modal";

@Injectable()
export class ContactEffects {
  // Load Contacts
  @Effect()
  loadContacts$: Observable<Action> = this.actions$.pipe(
    ofType(fromContacts.ContactActionTypes.LoadContacts),
    switchMap((action: fromContacts.LoadContacts) => {
      return this.contactsApi.getContacts(action.payload).pipe(
        switchMap((res: any) => {
          return [
            new fromContacts.AddContacts({ contacts: res.contacts }),
            new fromContacts.TotalPages(res.totalPages)
          ];
        }),
        catchError(err => {
          return of(new fromContacts.ContactsError(err));
        })
      );
    })
  );

  // Add Contact
  @Effect()
  addContact$: Observable<Action> = this.actions$.pipe(
    ofType(fromContacts.ContactActionTypes.AddContact),
    switchMap((action: fromContacts.AddContact) => {
      return this.contactsApi.createContact(action.payload.contact).pipe(
        switchMap((res: any) => {
          console.log("Contact has been added successfully!");
          // Show notification
          this.ngxSmartModalService.get("addContactModal").close();
          return [
            new fromContacts.ContactAdded({ contact: res.contact }),
            new fromContacts.TotalPages(res.totalPages)
          ];
        }),
        catchError(err => {
          return of(new fromContacts.ContactsError(err.error.message));
        })
      );
    })
  );

  // Update Contact
  @Effect()
  updateContact$: Observable<Action> = this.actions$.pipe(
    ofType(fromContacts.ContactActionTypes.UpdateContact),
    switchMap((action: fromContacts.UpdateContact) => {
      const { id, data } = action.payload;

      console.log("Send this data: ", data);
      // Remove _id before sending
      return this.contactsApi.editContact(id, data).pipe(
        switchMap((res: any) => {
          console.log("Contact has been updated successfully!");


          console.log("id Before", id)
          console.log("id after", res.contact._id)
          // Show notification
          return [
            new fromContacts.ContactUpdated({
              contact: {
                changes: res.contact,
                id: res.contact._id
              }
            }),
            new fromContacts.ContactsError(null)
          ];
        }),
        catchError(err => {
          console.log("err", err);
          return of(new fromContacts.ContactsError(err.error.message));
        })
      );
    })
  );

  // Delete Contact
  @Effect()
  deleteContacts$: Observable<Action> = this.actions$.pipe(
    ofType(fromContacts.ContactActionTypes.DeleteContact),
    switchMap((action: fromContacts.DeleteContact) => {
      return this.contactsApi.deleteContact(action.payload).pipe(
        switchMap((res: any) => {
          // Show notification
          return [
            new fromContacts.ContactDeleted({ id: `${action.payload}` }),
            new fromContacts.TotalPages(res.totalPages)
          ];
        }),
        catchError(err => {
          console.log("err", err);
          return of(new fromContacts.ContactsError(err.erro.message));
        })
      );
    })
  );

  constructor(
    private actions$: Actions,
    public ngxSmartModalService: NgxSmartModalService,
    private contactsApi: ContactsApiService
  ) {}
}
