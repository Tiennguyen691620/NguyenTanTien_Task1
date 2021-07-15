import { any } from 'codelyzer/util/function';
import { Component, OnInit } from '@angular/core';
import { Student } from '../model/Student';
import { HttpServerService } from '../Services/http-server.service';
import { Router } from '@angular/router';
import { CommonService } from '../Services/common.service';
import { Observable, Subscriber } from 'rxjs';



@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  pageNumbers: number[] = [];
  pageIndex = 1;
  pageSize = 10;
  public students: Student[] = [];
  studentShow!: Student[];
  constructor(
    private common: CommonService,
    private serverHttp: HttpServerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    //   this.serverHttp.getPost().subscribe((result: any) => {
    //   this.showpost = result;
    //   this.totallength = result.length;
    //   console.log(this.showpost);
    // }),

    this.loadData(this.pageIndex);
  }
  // tslint:disable-next-line:typedef
  public loadData(pageIndex: number) {
    this.serverHttp.getStudents().subscribe((data) => {
      this.students = data;
      this.studentShow = this.students.slice(0, this.pageSize);
      this.common.setTotalStudents(data.length);
      this.pageNumbers = [];
      for (
        let i = 1;
        i <= Math.ceil(this.students.length / this.pageSize);
        i++
      ) {
        this.pageNumbers?.push(i);
      }
    });
  }
  // tslint:disable-next-line:typedef
  handleDelete(id: number) {
    // @ts-ignore
    const index = this.students.findIndex(e => e.id === id);
    if (index !== -1) {
      this.students.splice(index, 1);
    }
    console.log(id);
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
  public deleteStudent(studentId: any) {
    this.serverHttp.deleteStudent(studentId).subscribe((data) => {
      console.log('delete', data);
      this.loadData(this.pageIndex);
    });
  }
  increaseOrDecreasePage(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.studentShow = this.students.slice(
      (this.pageIndex - 1) * this.pageSize,
      this.pageIndex * this.pageSize
    );
  }
  getData(pageIndex: number): void {
    this.pageIndex = pageIndex;
    console.log(this.pageIndex);
    this.studentShow = this.students.slice(
      (pageIndex - 1) * this.pageSize,
      pageIndex * this.pageSize
    );
  }
  changePageSize(pageSize: number): void {
    this.pageNumbers = [];
    console.log(this.students);
    for (
      let i = 1;
      i <= Math.ceil(this.students.length / this.pageSize);
      i++
    ) {
      this.pageNumbers?.push(i);
    }
    const totalPages = this.pageNumbers.length;
    if (this.pageIndex > totalPages) {
      this.pageIndex = totalPages;
    }
    this.pageSize = pageSize;
    this.studentShow = this.students.slice(0, this.pageSize);

    // this.getData(this.pageIndex);
  }
}
