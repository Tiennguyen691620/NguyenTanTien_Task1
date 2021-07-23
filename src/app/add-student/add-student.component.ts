// tslint:disable-next-line:no-trailing-whitespace

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../Services/common.service';
import {
  ConfirmValidParentMatcher,
  errorMessages,
  HttpServerService,
} from '../Services/http-server.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../model/Student';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

const PASSWORD_PATTERN = /^(?=.*[!@#$%^&*]+)[a-z0-9!@#$%^&*]{6,32}$/;

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss'],
})
export class AddStudentComponent implements OnInit {
  public id = 0;
  errors = errorMessages;
  studentForm!: FormGroup;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  constructor(
    private common: CommonService,
    private serverHttp: HttpServerService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initForm();
  }

  // tslint:disable-next-line:typedef
  public Save(): void {
    if (this.id > 0) {
      this.serverHttp
        .modifyStudent(this.id, this.createNewData())
        .subscribe(() => {
          this.router.navigate(['student']);
        });
      return;
    }
    this.serverHttp.addStudent(this.createNewData()).subscribe((data) => {
      this.router.navigate(['student']);
    });
  }
  public Cancel(): void {
    this.router.navigate(['student']);
  }
  // tslint:disable-next-line:typedef
  // public save() {
  //   if (this.id > 0) {
  //     this.serverHttp
  //       .modifyStudent(this.id, this.createNewData())
  //       .subscribe((data) => {
  //         //
  //       });
  //   } else {
  //     this.serverHttp.addStudent(this.createNewData()).subscribe((data) => {
  //       this.common.increamentStudent();
  //       this.studentForm.reset();
  //     });
  //   }
  // }

  ngOnInit(): void {
    // @ts-ignore
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id > 0) {
      this.loadData(this.id);
      // setTimeout(() => {
      //   // <<<---using ()=> syntax
      //   this.loadData(this.id);
      // }, 3000);
    }
  }

  // tslint:disable-next-line:typedef
  private loadData(id: number) {
    this.serverHttp.getStudent(id).subscribe((data) => {
      console.log('getStudent', data);
      // for (const controlName in this.studentForm.controls) {
      //   if (controlName) {
      //     this.studentForm.controls[controlName].setValue(data[controlName]);
      //   }
      // }
      this.studentForm.patchValue(data);
    });
  }

  // tslint:disable-next-line:typedef
  private createNewData() {
    const newStudent = {};
    for (const controlName in this.studentForm.controls) {
      if (controlName) {
        // @ts-ignore
        newStudent[controlName] = this.studentForm.controls[controlName].value;
      }
    }
    return newStudent as Student;
  }

  // tslint:disable-next-line:typedef
  initForm() {
    this.studentForm = this.fb.group(
      {
        name: [
          '',
          Validators.compose([
            Validators.required,
            Validators.maxLength(50),
            Validators.pattern(/^[a-z]{0,50}$/i),
          ]),
        ],
        address: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(/^[a-z0-9]{0,100}$/i),
          ]),
        ],
        phone: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
            Validators.pattern(/^[0-9]{10,10}$/i),
          ]),
        ],
        email: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(/^([a-z0-9]+)([@gmail.com]+){6,100}$/i),
          ]),
        ],
        passwordGroup: this.fb.group(
          {
            password: [
              '',
              Validators.compose([
                Validators.required,
                Validators.minLength(6),
                Validators.pattern(PASSWORD_PATTERN),
              ]),
            ],
            confirmPassword: [
              '',
              Validators.compose([
                Validators.required,
                Validators.minLength(6),
                Validators.pattern(PASSWORD_PATTERN),
              ]),
            ],
          },
          { validator: HttpServerService.childrenEqual }
        ),
        isEdit: [
          '',
          Validators.compose([
            // Validators.required,
          ]),
        ],
      },
      { validators: this.validateControlsValue('password', 'confirmPassword') }
    );
  }

  // tslint:disable-next-line:typedef
  private validateControlsValue(
    firstControlName: string,
    secondControlName: string
  ) {
    // tslint:disable-next-line:only-arrow-functions typedef
    return function(formGroup: FormGroup) {
      const x = formGroup.get(firstControlName);
      const y = formGroup.get(secondControlName);
      return x?.value === y?.value
        ? null
        : {
            valueNotMatch: {
              firstControlValue: x?.value,
              secondControlValue: y?.value,
            },
          };
    };
  }
}
