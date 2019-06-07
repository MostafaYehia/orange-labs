import { Component, OnInit } from "@angular/core";
import { SlideShowItem } from "../../components/slide-show/slide-show-item.component";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/ngrx-store/reducers";
import { LoadUser } from "src/app/auth/actions/auth.actions";

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.scss"]
})
export class LandingPageComponent implements OnInit {
  slides: SlideShowItem[] = [
    {
      bg: "../../../../assets/imgs/welcome-1.jpg",
      headline: "The industry's standard dummy ever since the 1500s",
      description: `
        Printer took a galley of type and scrambled it to make a type specimen book. 
        It has survived not only five centuries
    `,
      actionBotton: {
        label: "Apply",
        action: () => console.log("Applying...")
      }
    },
    {
      bg: "../../../../assets/imgs/welcome-2.jpg",
      headline: "Dummy standard ever since the 1500s",
      description: `
        Scrambled it to make a type specimen book. 
        It has survived not only five centuries
    `,
      actionBotton: {
        label: "Apply",
        action: () => console.log("Applying...")
      }
    },
    {
      bg: "../../../../assets/imgs/welcome-3.jpg",
      headline: "Standard dummy ever since the 1500s",
      description: `
        When an unknown printer took a galley of type and scrambled it to make a type specimen book. 
        It has survived not only five centuries
    `,
      actionBotton: {
        label: "Apply",
        action: () => console.log("Applying...")
      }
    }
  ];
  constructor(private store: Store<AppState>) {}

  ngOnInit() {

  }
}
