import { Action } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { Contact } from "../models/contact.model";

export enum ContactActionTypes {
  LoadContacts = "[Contact] Load Contacts",
  AddContact = "[Contact] Add Contact",
  ContactAdded = "[Contact] Contact Added",
  AddContacts = "[Contact] Add Contacts",
  UpdateContact = "[Contact] Update Contact",
  ContactUpdated = "[Contact] Contact Updated",
  DeleteContact = "[Contact] Delete Contact",
  ContactDeleted = "[Contact] Contact Deleted",
  CurrentPage = "[Contact] Set Page",
  TotalPages = "[Contact] Set Total Pages Count",
  SortType = "[Contact] Set Sort Type",
  ContactsError = "[Contact] Error"
}

export class LoadContacts implements Action {
  readonly type = ContactActionTypes.LoadContacts;

  constructor(public payload: number) {}
}

export class AddContact implements Action {
  readonly type = ContactActionTypes.AddContact;

  constructor(public payload: { contact: Contact }) {}
}

export class ContactAdded implements Action {
  readonly type = ContactActionTypes.ContactAdded;

  constructor(public payload: { contact: Contact }) {}
}

export class AddContacts implements Action {
  readonly type = ContactActionTypes.AddContacts;

  constructor(public payload: { contacts: Contact[] }) {}
}

export class UpdateContact implements Action {
  readonly type = ContactActionTypes.UpdateContact;

  constructor(public payload: { id: string; data: any }) {}
}

export class ContactUpdated implements Action {
  readonly type = ContactActionTypes.ContactUpdated;

  constructor(public payload: { contact: Update<Contact> }) {}
}

export class DeleteContact implements Action {
  readonly type = ContactActionTypes.DeleteContact;

  constructor(public payload: { id: string }) {}
}

export class ContactDeleted implements Action {
  readonly type = ContactActionTypes.ContactDeleted;

  constructor(public payload: { id: string }) {}
}

export class CurrentPage implements Action {
  readonly type = ContactActionTypes.CurrentPage;
  constructor(public payload: number) {}
}

export class TotalPages implements Action {
  readonly type = ContactActionTypes.TotalPages;
  constructor(public payload: number) {}
}

export class SortType implements Action {
  readonly type = ContactActionTypes.SortType;
  constructor(public payload: string) {}
}

export class ContactsError implements Action {
  readonly type = ContactActionTypes.ContactsError;
  constructor(public payload: string) {}
}

export type ContactActions =
  | LoadContacts
  | AddContact
  | ContactAdded
  | AddContacts
  | UpdateContact
  | ContactUpdated
  | DeleteContact
  | ContactDeleted
  | CurrentPage
  | TotalPages
  | SortType
  | ContactsError;
