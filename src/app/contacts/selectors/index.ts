import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ContactsState, selectIds, selectEntities, selectAll } from "../reducers/contact.reducer";

const contactsState = createFeatureSelector<ContactsState>("contacts");

// Get Current Page
export const getCurrentPage = createSelector(
  contactsState,
  (state: ContactsState) => state.currentPage
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
  selectAll
);
