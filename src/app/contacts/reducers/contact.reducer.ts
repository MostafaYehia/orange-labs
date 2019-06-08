import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { Contact } from "../models/contact.model";
import { ContactActions, ContactActionTypes } from "../actions/contact.actions";

export interface ContactsState extends EntityState<Contact> {
  // additional entities state properties
  currentPage: number;
  totalPages: number;
  sortBy: string;
}

export const adapter: EntityAdapter<Contact> = createEntityAdapter<Contact>();

export const initialState: ContactsState = adapter.getInitialState({
  // additional entity state properties
  currentPage: 1,
  totalPages: 10,
  sortBy: "firstName"
});

export function reducer(state = initialState, action: ContactActions): ContactsState {
  switch (action.type) {
    case ContactActionTypes.AddContact: {
      return adapter.addOne(action.payload.contact, state);
    }

    case ContactActionTypes.UpsertContact: {
      return adapter.upsertOne(action.payload.contact, state);
    }

    case ContactActionTypes.AddContacts: {
      return adapter.addMany(action.payload.contacts, state);
    }

    case ContactActionTypes.UpsertContacts: {
      return adapter.upsertMany(action.payload.contacts, state);
    }

    case ContactActionTypes.UpdateContact: {
      return adapter.updateOne(action.payload.contact, state);
    }

    case ContactActionTypes.UpdateContacts: {
      return adapter.updateMany(action.payload.contacts, state);
    }

    case ContactActionTypes.DeleteContact: {
      return adapter.removeOne(action.payload.id, state);
    }

    case ContactActionTypes.DeleteContacts: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case ContactActionTypes.LoadContacts: {
      return adapter.addAll(action.payload.contacts, state);
    }

    case ContactActionTypes.ClearContacts: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();
