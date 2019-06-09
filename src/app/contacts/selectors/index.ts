import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  ContactsState,
  selectIds,
  selectEntities,
  selectAll
} from "../reducers/contact.reducer";
import { Contact } from "../models/contact.model";

const contactsState = createFeatureSelector<ContactsState>("contact");

// Get Current Page
export const getCurrentPage = createSelector(
  contactsState,
  (state: ContactsState) => state.currentPage
);


// Get Contact Errors
export const getContactsErrors = createSelector(
  contactsState,
  (state: ContactsState) => state.error
);

// Get Sort state
export const getSortBy = createSelector(
  contactsState,
  (state: ContactsState) => state.sortBy
);

// Get total pages count
export const getTotalPagesCount = createSelector(
  contactsState,
  (state: ContactsState) => state.totalPages
);

// Get Contact Entities
export const getContactEntities = createSelector(
  contactsState,
  selectEntities
);

// Get All Contacts
export const getAllContacts = createSelector(
  contactsState,
  getSortBy,
  getCurrentPage,
  (state: ContactsState, sortType: string, currentPage: number): Contact[] => {
    const result = [];
    const contacts = state.entities;
    let ids: string[] | number[] = state.ids;
    let skip = (currentPage - 1) * 10;

    if (ids.length) {
      console.log("Skip: ", skip)
      const skipped = state.ids.slice(skip, skip + 10);
      for (const id of skipped) {
        result.push(contacts[id]);
      }
    }

    return result.sort((a, b) => (a[sortType] > b[sortType] ? 1 : -1));
  }
);
