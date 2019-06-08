import { Component, OnInit, AfterViewInit, Input } from "@angular/core";
import { ContactsApiService } from "../../services/contacts-api.service";
import { NgxSmartModalService } from "ngx-smart-modal";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { catchError, map } from "rxjs/operators";
import { of } from "rxjs";
import { requiredFileTypes } from "src/app/shared/validators";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"]
})
export class ContactComponent implements OnInit, AfterViewInit {
  editContactForm: FormGroup;
  editContactSubmited = false;
  @Input() contact = {};
  updateMessage = {
    type: "success",
    body: ""
  };

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    private contactsApi: ContactsApiService
  ) {}

  get editFormControls() {
    return this.editContactForm.controls;
  }

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

  editContact() {
    this.editContactSubmited = true;
    if (this.editContactForm.valid) {
      const formData = new FormData();
      const editFormControls = this.editContactForm.controls;

      Object.keys(editFormControls).forEach(key => {
        const value = this.editContactForm.get(key).value;
        formData.append(key, value);
      });
      const sub = this.contactsApi
        .editContact("5cfabcada5b3472ae03db4a5", formData)
        .pipe(
          map((res: any) => {
            this.updateMessage.type = "success";
            this.updateMessage.body = "Contact has been updated successfully";
            this.contact = res.contact;
          }),
          catchError(err => {
            console.log("Upload avatar error: ", err);
            this.updateMessage.type = "error";
            this.updateMessage.body = err.error.message;
            return of(err);
          })
        )
        .subscribe((res: any) => {
          sub.unsubscribe();
        });
    }
  }

  onAvatarSelect(event) {
    if (event.target.files.length > 0) {
      this.updateMessage.body = "";
      const file = event.target.files[0];
      this.editContactForm.get("avatar").setValue(file);
    }
  }

  deleteContact() {
    const sub = this.contactsApi
      .deleteContact(this.contact["_id"])
      .pipe(
        map((res: any) => {
          console.log("Contact has been deleted successfully");
        }),
        catchError(err => {
          console.log("Deleteing contact erro", err);
          return of(err);
        })
      )
      .subscribe((res: any) => {
        sub.unsubscribe();
      });
  }
}
