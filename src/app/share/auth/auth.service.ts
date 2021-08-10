import { any } from 'codelyzer/util/function';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServerService } from '../../share/Services/http-server.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:5000/manager';

  constructor(
    private router: Router,
    private serverHttp: HttpServerService,
    private http: HttpClient
  ) { }

  /**
   * name
   */
  // tslint:disable-next-line:typedef
  public isLoggedIn() {
    return localStorage.getItem('user') ;
  }

  // public isLoggedIn() {
  //   return this.http.post<any>(this.loginUrl, );
  // }

  // tslint:disable-next-line:typedef
  public logoutUser() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}


