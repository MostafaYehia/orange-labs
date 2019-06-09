import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { storeFreeze } from "ngrx-store-freeze";
import { environment } from "../../../environments/environment";
import * as fromContact from "../../contacts/reducers/contact.reducer";

export interface AppState {}

export const reducers: ActionReducerMap<AppState> = {};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [storeFreeze]
  : [];
