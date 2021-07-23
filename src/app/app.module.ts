import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { AddStudentComponent } from './add-student/add-student.component';
import {MatButtonModule} from '@angular/material/button';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { StudentComponent } from './student/student.component';
import { NzModalCustomComponent } from './nz-modal-custom/nz-modal-custom.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { ShareModule } from './share/share.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    AddStudentComponent,
    LoginComponent,
    StudentComponent,
    NzModalCustomComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    ShareModule,
    NgbModule,

  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
