import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as fromContacts from "../actions/contact.actions";
import { Observable, of } from "rxjs";
import { Action } from "@ngrx/store";
import { switchMap, map, catchError } from "rxjs/operators";
import { ContactsApiService } from "../services/contacts-api.service";

@Injectable()
export class ContactEffects {
  // Load Contacts
  @Effect()
  loadUser$: Observable<Action> = this.actions$.pipe(
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

  constructor(
    private actions$: Actions,
    private contactsApi: ContactsApiService
  ) {}
}
