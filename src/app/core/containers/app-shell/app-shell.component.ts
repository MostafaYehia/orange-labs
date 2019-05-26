import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-shell',
  template: `
      <app-navbar></app-navbar>
      <div class="container">
        <main>
          <router-outlet></router-outlet>
        </main>
      </div>  
  `,
  styles: [``]
})
export class AppShellComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
