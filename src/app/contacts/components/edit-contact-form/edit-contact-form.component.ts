import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ContactsApiService } from "../../services/contacts-api.service";
import { AppState } from "src/app/ngrx-store/reducers";
import { Store } from "@ngrx/store";
import { requiredFileTypes } from "src/app/shared/validators";
import { map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { ChangeDetectionStrategy } from "@angular/core";
import * as fromContacts from "../../actions/contact.actions";

@Component({
  selector: "app-edit-contact-form",
  templateUrl: "./edit-contact-form.component.html",
  styleUrls: ["./edit-contact-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditContactFormComponent implements OnInit {
  editContactForm: FormGroup;
  @Input() contact = {};
  editContactSubmited = false;
  updateMessage = {
    type: "success",
    body: ""
  };
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.editContactForm = new FormGroup({
      avatar: new FormControl("", requiredFileTypes(["png", "jpg", "jpeg"])),
      firstName: new FormControl(
        this.contact["firstName"],
        Validators.compose([
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern("^[a-zA-Z_ ]*$")
        ])
      ),
      lastName: new FormControl(
        this.contact["lastName"],
        Validators.compose([
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern("^[a-zA-Z_ ]*$")
        ])
      ),
      email: new FormControl(
        this.contact["email"],
        Validators.compose([Validators.required, Validators.email])
      ),
      phone: new FormControl(
        this.contact[""],
        Validators.compose([Validators.required, Validators.maxLength(30)])
      )
    });
  }

  ngAfterViewInit() {
    const editFormControls = this.editContactForm.controls;
    Object.keys(editFormControls).forEach(key => {
      this.editContactForm.get(key).setValue(this.contact[key]);
    });
  }

  get editFormControls() {
    return this.editContactForm.controls;
  }

  editContact() {
    this.editContactSubmited = true;
    if (this.editContactForm.valid) {
      this.updateMessage.body = null;
      const formData = new FormData();
      const editFormControls = this.editContactForm.controls;

      Object.keys(editFormControls).forEach(key => {
        const value = this.editContactForm.get(key).value;
        formData.append(key, value);
      });

      this.store.dispatch(new fromContacts.UpdateContact(this.contact["_id"]));
    }
  }

  onAvatarSelect(event) {
    if (event.target.files.length > 0) {
      this.updateMessage.body = "";
      const file = event.target.files[0];
      this.editContactForm.get("avatar").setValue(file);
    }
  }
}
