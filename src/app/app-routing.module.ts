
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddStudentComponent } from './dashboard/add-student/add-student.component';
import { AuthGuard } from './share/auth/auth.guard';
import { HomeComponent } from './dashboard/home/home.component';

import { NotFoundComponent } from './dashboard/not-found/not-found.component';
import { StudentComponent } from './dashboard/student/student.component';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './dashboard/change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'student',
    component: StudentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-student/:id',
    component: AddStudentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login/login.module').then(x => x.LoginModule)
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
