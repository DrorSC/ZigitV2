import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css']
})
export class CourseCardComponent implements OnInit {

  public isCollapsed = true;;

  @Input() course: Course;
  @Input() courseColor: number;

  // used to send the course selected to parent homeComp
  @Output() courseSelected: EventEmitter<Course> =
    new EventEmitter<Course>();

  constructor() { }

  ngOnInit() {
    this.setCourseColor();
  }

  // Sending the selected course through the @Output to show the students on this course
  ShowStudents(course: Course) {
    this.courseSelected.emit(course);
  }

  setCourseColor(){
    
  }

}
