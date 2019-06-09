import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { Contact } from "../models/contact.model";
import { ContactActions, ContactActionTypes } from "../actions/contact.actions";

export interface ContactsState extends EntityState<Contact> {
  // additional entities state properties
  currentPage: number;
  totalPages: number;
  sortBy: string;
  error: string | null;
}

export const adapter: EntityAdapter<Contact> = createEntityAdapter<Contact>();

export const initialState: ContactsState = adapter.getInitialState({
  // additional entity state properties
  currentPage: 1,
  totalPages: 10,
  sortBy: "firstName",
  error: null
});

export function reducer(
  state = initialState,
  action: ContactActions
): ContactsState {
  switch (action.type) {
    case ContactActionTypes.ContactAdded: {
      return adapter.addOne(action.payload.contact, state);
    }

    case ContactActionTypes.AddContacts: {
      return adapter.addMany(action.payload.contacts, state);
    }

    case ContactActionTypes.ContactUpdated: {
      return adapter.updateOne(action.payload.contact, state);
    }

    case ContactActionTypes.ContactDeleted: {
      return adapter.removeOne(action.payload.id, state);
    }

    case ContactActionTypes.CurrentPage: {
      return { ...state, currentPage: action.payload };
    }

    case ContactActionTypes.TotalPages: {
      return { ...state, totalPages: action.payload };
    }

    case ContactActionTypes.SortType: {
      return { ...state, sortBy: action.payload };
    }

    case ContactActionTypes.ContactsError: {
      return {...state, error: action.payload}
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
