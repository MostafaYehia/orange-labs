import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/ngrx-store/reducers';
import { Store } from '@ngrx/store';
import { getCurrentUser } from '../../../auth/selectors';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  currentUser$: Observable<any>;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.currentUser$ = this.store.select(getCurrentUser);
  }

}
