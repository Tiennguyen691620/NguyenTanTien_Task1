import { any } from 'codelyzer/util/function';
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Student} from '../model/Student';
import {FormControl, FormGroup, FormGroupDirective, NgForm, ValidatorFn} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Manager } from '../model/manager';

@Injectable({
  providedIn: 'root'
})

export class HttpServerService {
  constructor(
    private httpClient: HttpClient
  ) { }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  private REST_API_SERVER = 'http://localhost:5000';
  // @ts-ignore
  static childrenEqual: ValidatorFn = (formGroup: FormGroup) => {
    const [firstControlName, ...otherControlNames] = Object.keys(formGroup.controls || {});
    // @ts-ignore
    const isValid = otherControlNames.every(controlName => formGroup.get(controlName).value === formGroup.get(firstControlName).value);
    return isValid ? null : {childrenNotEqual: true};
  }

  // tslint:disable-next-line:typedef
  public searchStudent(textSearch: any): Observable<any> {
    const url = `${this.REST_API_SERVER}/students?q=${textSearch}`;
    return this.httpClient
    .get<Student>(url, this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  // tslint:disable-next-line:typedef
  public getStudents(): Observable<any> {
    const url = `${this.REST_API_SERVER}/students`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // tslint:disable-next-line:typedef
  public getStudent(studentId: number) {
    const url = `${this.REST_API_SERVER}/students/` + studentId;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getManager(username: string): Observable<any> {
    const url = `${this.REST_API_SERVER}/manager/?username=${username}`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }



  // tslint:disable-next-line:typedef
  public addStudent(data: Student) {
    const url = `${this.REST_API_SERVER}/students`;
    return this.httpClient
      .post<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // tslint:disable-next-line:typedef
  public addManager(data: Manager) {
    const url = `${this.REST_API_SERVER}/manager`;
    return this.httpClient
      .post<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }



  // tslint:disable-next-line:typedef
  public deleteStudent(studentId: number) {
    const url = `${this.REST_API_SERVER}/students/` + studentId;
    return this.httpClient.delete<any>(url).pipe(catchError(this.handleError));
  }



  // tslint:disable-next-line:typedef
  modifyStudent(studentId: number, data: Student) {
    const url = `${this.REST_API_SERVER}/students/` + studentId;
    return this.httpClient
      .put<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  // tslint:disable-next-line:typedef
  modifyManager(managerId: number, data: Manager) {
    const url = `${this.REST_API_SERVER}/manager/` + managerId;
    return this.httpClient
      .put<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }



  // tslint:disable-next-line:typedef
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

}
export class ConfirmValidParentMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    // @ts-ignore
    return control.parent.invalid && control.touched;
  }
}
export const errorMessages: { [key: string]: string } = {
  name: 'Full name must be abc...',
  address: 'address',
  phone: 'Phone number must be 10 number',
  email: 'Email must be a valid email address (username@domain)',
  // confirmEmail: 'Email addresses must match',
  password: 'Password must be between 7 and 15 characters, and contain at least one number and special character',
  confirmPassword: 'Passwords must match'
};
