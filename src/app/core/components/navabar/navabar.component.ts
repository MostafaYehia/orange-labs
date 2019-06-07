import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../ngrx-store/reducers';
import { Logout } from '../../../auth/actions/auth.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navabar.component.html',
  styleUrls: ['./navabar.component.scss']
})
export class NavabarComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  logout() {
    this.store.dispatch(new Logout());
  }

}
