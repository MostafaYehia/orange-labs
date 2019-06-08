import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-app-shell",
  template: `
    <app-navbar></app-navbar>
    <main class="page__wrapper">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [``]
})
export class AppShellComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
