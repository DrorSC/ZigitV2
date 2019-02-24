import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  title = "Course List";


  // sent from parent homeComp to show the courses in list
  @Input() courses: Course[];

  @Input() courseColor: number;

  // used to send the course selected to parent homeComp
  @Output() courseSelected: EventEmitter<Course> =
    new EventEmitter<Course>();

  constructor() { }

  ngOnInit() {
  }

  // // Sending the selected course through the @Output to show the students on this course
  // ShowStudents(course: Course) {
  //   this.courseSelected.emit(course);
  // }

  // after course is selected, show the students list
  onCourseSelected(course: Course) {
    this.courseSelected.emit(course);
  }

  // color the courses - TODO
  colorCourses() {
    for (let course of this.courses) {

    }
  }

}
