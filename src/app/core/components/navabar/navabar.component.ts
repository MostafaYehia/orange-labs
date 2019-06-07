import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../ngrx-store/reducers';
import { Logout } from '../../../auth/actions/auth.actions';
import { Observable } from 'rxjs';
import { isLoggedInState } from 'src/app/auth/selectors';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navabar.component.html',
  styleUrls: ['./navabar.component.scss']
})
export class NavabarComponent implements OnInit {

  loggedState$: Observable<boolean>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.loggedState$  = this.store.select(isLoggedInState).pipe(shareReplay(1))
  }

  logout() {
    this.store.dispatch(new Logout());
  }

}
