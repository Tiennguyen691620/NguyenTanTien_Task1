import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public totalStudents = 0;
  public totalStudents$ = new BehaviorSubject<number>(0);
  constructor() { }

  // tslint:disable-next-line:typedef
  increamentStudent() {
    this.totalStudents++;
    this.totalStudents$.next(this.totalStudents);
  }

  // tslint:disable-next-line:typedef
  public setTotalStudents(total: number) {
    this.totalStudents = total;
    this.totalStudents$.next(total);
  }
}
