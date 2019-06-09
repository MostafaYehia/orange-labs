import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { isLoggedInState } from '../../selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../../ngrx-store/reducers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    // this.subs
    this.subs.push(
      this.store.select(isLoggedInState).subscribe(loggedIn => {
        if (loggedIn) {
          this.router.navigate(["/main"]);
        }
      })
    );
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
