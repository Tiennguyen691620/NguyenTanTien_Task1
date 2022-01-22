import { any } from 'codelyzer/util/function';

import { Component, Input, OnInit } from '@angular/core';
import { Student } from '../../share/model/Student';
import { HttpServerService } from '../../share/Services/http-server.service';
import { Router } from '@angular/router';
import { CommonService } from '../../share/Services/common.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ViewContainerRef } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  listOfData: Student[] = [];
  firstName: any;
  textSearch?: string;

  searchTerm$ = new BehaviorSubject<string>('');
  constructor(
    private common: CommonService,
    private serverHttp: HttpServerService,
    private router: Router,
    private viewContainerRef: ViewContainerRef,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.searchTerm$.pipe(debounceTime(1000)).subscribe((_) => {
      this.serverHttp
        .searchStudent(this.textSearch)
        .subscribe((students: any) => {
          this.listOfData = students;
        });
      console.log(this.searchTerm$);
    });
  }
  // tslint:disable-next-line:typedef
  public loadData() {
    this.textSearch = '';
    this.serverHttp.getStudents().subscribe((data) => {
      console.log('getStudents', data);
      this.listOfData = data;
      this.common.setTotalStudents(data.length);
    });
  }

  // tslint:disable-next-line:typedef
  public addStudent() {
    this.router.navigate(['add-student', 0]);
  }
  // tslint:disable-next-line:typedef
  public editStudent(studentId: any) {
    this.router.navigate(['add-student', studentId]);
  }
  // tslint:disable-next-line:typedef
  public deleteStudent(studentId: any): void {
    this.serverHttp.deleteStudent(studentId).subscribe((data) => {
      console.log('delete', data);
      this.loadData();
    });
  }
  // tslint:disable-next-line:typedef
  getPageIndex(pageIndex: number) {
    this.pageIndex = pageIndex;
  }

  // tslint:disable-next-line:typedef
  getPageSizeChange(PageSizeChange: number) {
    this.pageSize = PageSizeChange;
  }

  // search(search: any): void {
  //   const targetValue: any[] = [];
  //   this.listOfData.forEach((value: any) => {
  //     const keys = Object.keys(value);
  //     // tslint:disable-next-line: prefer-for-of
  //     for (let i = 0; i < keys.length; i ++) {
  //       if (value[keys[i]] && value[keys[i]].toString().toLocaleLowerCase().valueOf().includes(search)){
  //         targetValue.push(value);
  //         break;
  //       }
  //     }
  //   });
  //   this.listOfData  = targetValue;
  // }

  createCustomButtonModal(): void {
    const modal: NzModalRef = this.modal.create({
      nzTitle: 'custom button demo',
      nzContent:
        'pass array of button config to nzFooter to create multiple buttons',
      nzFooter: [
        {
          label: 'Close',
          shape: 'round',
          onClick: () => modal.destroy(),
        },
        {
          label: 'Delete',
          type: 'primary',
          shape: 'round',
          onClick: () => this.deleteStudent({}),
        },
      ],
    });
  }
}
