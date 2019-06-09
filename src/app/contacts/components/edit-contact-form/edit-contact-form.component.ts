import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ContactsApiService } from "../../services/contacts-api.service";
import { AppState } from "src/app/ngrx-store/reducers";
import { Store } from "@ngrx/store";
import { requiredFileTypes } from "src/app/shared/validators";
import { map, catchError } from "rxjs/operators";
import { of, Observable, Subscription } from "rxjs";
import { ChangeDetectionStrategy } from "@angular/core";
import * as fromContacts from "../../actions/contact.actions";
import { getContactsErrors } from "../../selectors";
import { NgxSmartModalService } from "ngx-smart-modal";

@Component({
  selector: "app-edit-contact-form",
  templateUrl: "./edit-contact-form.component.html",
  styleUrls: ["./edit-contact-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditContactFormComponent implements OnInit, OnDestroy {
  editContactForm: FormGroup;
  error: Observable<any>;
  editAvatar;
  @Input() contact = {};

  editContactSubmited = false;
  updateErrorMessage$: Observable<null | string>;
  subs: Subscription[] = [];
  constructor(
    private store: Store<AppState>,
    public ngxSmartModalService: NgxSmartModalService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Get conatct edit error
    this.updateErrorMessage$ = this.store.select(getContactsErrors);


    // Store edit avatar
    this.editAvatar = this.contact['avatars'].medium;

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
      const formData = new FormData();
      const editFormControls = this.editContactForm.controls;

      Object.keys(editFormControls).forEach(key => {
        const value = this.editContactForm.get(key).value;
        formData.append(key, value);
      });

      this.store.dispatch(
        new fromContacts.UpdateContact({
          id: this.contact["_id"],
          data: formData
        })
      );
    }
  }

  onAvatarSelect(event) {
    if (event.target.files.length > 0) {
      this.store.dispatch(new fromContacts.ContactsError(null));
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = ev => {
        this.editAvatar = ev.target['result'];
        this.cd.detectChanges();
        this.editContactForm.get("avatar").setValue(file);
      };

      reader.readAsDataURL(file);
    }
  }

  openEditModal() {
    this.ngxSmartModalService.get("editContactModal").open();
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
