import { Component, Input, OnInit } from '@angular/core';
import { Student } from '../model/Student';
import { HttpServerService } from '../Services/http-server.service';
import { Router } from '@angular/router';
import { CommonService } from '../Services/common.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ViewContainerRef } from '@angular/core';
import { NzModalCustomComponent } from '../nz-modal-custom/nz-modal-custom.component';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
  // pageNumbers: number[] = [];
    // studentShow!: Student[];
  pageIndex = 1;
  pageSize = 10;
  listOfData: Student[] = [];
  // editCache: { [key: string]: { edit: boolean; data: Student } } = {};

  constructor(
    private common: CommonService,
    private serverHttp: HttpServerService,
    private router: Router,
    private viewContainerRef: ViewContainerRef,
    private modal: NzModalService,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }
  // tslint:disable-next-line:typedef
  public loadData() {
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

  createCustomButtonModal(): void {
    const modal: NzModalRef = this.modal.create({
      nzTitle: 'custom button demo',
      nzContent: 'pass array of button config to nzFooter to create multiple buttons',
      nzFooter: [
        {
          label: 'Close',
          shape: 'round',
          onClick: () => modal.destroy()
        },
        {
          label: 'Delete',
          type: 'primary',
          shape: 'round',
          onClick: () => this.deleteStudent({}),
        },
      ]
    });
  }
}
