import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { Student } from 'src/app/models/student.model';
import { Sort } from '@angular/material';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  // parent HomeComp sending these 2 to show the course name, and the students list
  @Input() currentCourse: Course;
  @Input() students;

  currentCourseName = "";

  @Output() studentClicked: EventEmitter<Course> =
    new EventEmitter<Course>();

  constructor() {
    if (this.students)
      this.sortData = this.students.slice();
  }

  ngOnInit() {
  }


  // TODO - add (if <3) to status
  // TODO - check if need to change course color ?
  onStudentClick(student: Student) {
    if (student.ParExamStatus < 3) {
      student.ParExamStatus++;
    }
    this.studentClicked.emit(this.students);
  }

  // TODO - change course color ? from here or home or course list?
  colorCourse() {
    console.log("Color Course");
    console.log(this.students);
    for (let student of this.students) {

    }
  }

  sortData(sort: Sort) {
    if (!this.students)
      this.sortData = this.students.slice()
    const data = this.students.slice();
    if (!sort.active || sort.direction === '') {
      this.students = data;
      return;
    }

    this.students = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'CheckerComments': return this.compare(a.CheckerComments, b.CheckerComments, isAsc);
        case 'ParGrade': return this.compare(a.ParGrade, b.ParGrade, isAsc);
        case 'ParLinkToExamFile': return this.compare(a.ParLinkToExamFile, b.ParLinkToExamFile, isAsc);
        case 'CheckerAssitantArray': return this.compare(a.CheckerAssitantArray, b.CheckerAssitantArray, isAsc);
        case 'ExamTeacher': return this.compare(a.ExamTeacher, b.ExamTeacher, isAsc);
        case 'ParId': return this.compare(a.ParId, b.ParId, isAsc);
        case 'ParExamStatus': return this.compare(a.ParExamStatus, b.ParExamStatus, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}
