import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private service: AuthService,
    ) {}

  ngOnInit(): void {}
  // tslint:disable-next-line:typedef
  showConfirm() {
    this.router.navigate(['login']);
  }

  // tslint:disable-next-line:typedef
  logout() {
    this.service.logoutUser();
    console.log(this.logout);
  }
}
