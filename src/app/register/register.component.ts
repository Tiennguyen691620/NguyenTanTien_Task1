import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { Manager } from '../share/model/manager';
import { HttpServerService } from '../share/Services/http-server.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public id = 0;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private serverhttp: HttpServerService,

  ) {
    this.validateForm = this.fb.group({

      fullname: ['', [Validators.required] ],
      username: ['', [Validators.required], [this.userNameAsyncValidator]],
      email: ['', [Validators.email, Validators.required]],
      phoneNumber: ['', [Validators.required], [this.phoneNumberAsyncValidator]],
      password: ['', [Validators.required]],
      confirm: ['', [this.confirmValidator]],
    });
  }
  validateForm: FormGroup;

  ngOnInit(): void {
  }

  // tslint:disable-next-line:max-line-length
  submitForm(value: Manager): void {
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsDirty();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
    if (this.id > 0) {
      this.serverhttp
      .modifyManager(this.id, this.createNewData())
      .subscribe(() => {
        this.router.navigate(['login']);
      });
      return;
    }
    this.serverhttp.addManager(this.createNewData()).subscribe((data) => {
      this.router.navigate(['login']);
    });
    console.log(value);
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(key)) {
        this.validateForm.controls[key].markAsPristine();
        this.validateForm.controls[key].updateValueAndValidity();
      }
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }

  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          // you have to return `{error: true}` to mark it as an error event
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    })

    phoneNumberAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === '0889161328') {
          // you have to return `{error: true}` to mark it as an error event
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    })

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }


  // tslint:disable-next-line:typedef
  private createNewData() {
    const newManager = {};
    for (const controlName in this.validateForm.controls) {
      if (controlName) {
        // @ts-ignore
        newManager[controlName] = this.validateForm.controls[controlName].value;
      }
    }
    return newManager as Manager;
  }

  // tslint:disable-next-line:typedef
  login() {
    this.router.navigate(['/login']);
  }
}
