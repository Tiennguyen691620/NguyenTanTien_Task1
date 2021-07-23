import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpServerService } from '../Services/http-server.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private serverHttp: HttpServerService,
  ) { }

  /**
   * name
   */
  // tslint:disable-next-line:typedef
  public isLoggedIn() {
    return localStorage.getItem('user') ;
  }

}

