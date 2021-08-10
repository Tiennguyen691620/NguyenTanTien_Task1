import { Manager } from '../share/model/manager';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { HttpServerService } from '../share/Services/http-server.service';
import { Router } from '@angular/router';
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('crrUserDisplayName') crrUserDisplayName!: ElementRef;
  localStorageKey = 'user';

  validateForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private serverHttp: HttpServerService,
    private router: Router,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  submitForm(value: Manager): void {
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)){
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
      }
    }
    if (
      this.validateForm.getRawValue().userName !== null &&
      this.validateForm.getRawValue().password !== null
    ) {
      this.serverHttp
        .getManager(this.validateForm.getRawValue().userName)
        .subscribe((data) => {
          const manager = data;
          console.log(manager.length);

          if (manager.length !== 0) {
            const formValue = this.validateForm.getRawValue();
            if (
              manager[0].username === formValue.userName &&
              manager[0].password === formValue.password
            ) {
              localStorage.setItem('user', manager);
              this.createNotificationSuccess('success');
              this.router.navigate(['home']);
              this.setAuthenticationModel(manager[0]);
            }
            else if (
              manager[0].username !== formValue.userName ||
              manager[0].password !== formValue.password
            ) {
              this.createNotificationError('error');
            }
          }
        });
    }
    console.log(value);
  }

  // tslint:disable-next-line:typedef
  createNotificationError(arg0: string) {
    this.notification.create(
      arg0,
      'loign fail',
      'userName or passWord fale'
    );
  }

  // tslint:disable-next-line:typedef
  createNotificationSuccess(arg0: string) {
    this.notification.create(
      arg0,
      'Login Success',
      'Welcom to Task of Tien'
    );
  }

  createBasicNotification(position: NzNotificationPlacement): void {
    this.notification.blank(
      'Notification Title',
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      { nzPlacement: position }
    );
  }

    // tslint:disable-next-line:typedef
  public setAuthenticationModel(authenticationModel: Manager): any {
      return (window.localStorage[this.localStorageKey] = JSON.stringify(
        authenticationModel
      ));
    }




}

