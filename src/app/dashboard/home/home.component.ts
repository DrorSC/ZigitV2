import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Course } from 'src/app/models/course.model';
import { Student } from 'src/app/models/student.model';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User;
  users: User[] = [];

  isAuthenticated: boolean;

  courses: Course[];
  currentCourse: Course;

  students: Student[];

  courseColor: number;

  // tried to navigate to login if authenticated is false
  constructor(
    private apiService: ApiService,
    private router: Router,
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log("currentUser: ");
    console.log(this.currentUser);

    this.courseColor = 0;
  }


  ngOnInit() {
    this.loadAllCourses();
    this.initCoursesColor();

  }

  // add loader? add if fail => ?
  loadAllCourses() {
    console.log("load all courses");
    this.apiService.getCourses(this.currentUser.Token, this.currentUser.UserID)
      .subscribe((data: any) => {
        this.courses = data.Exams;
      });
  }

  // TODO - load all students when home page loads
  // and hide the table. Show it when clicking on course
  loadAllStudents(){}

  // after course is selected, show the students list
  onCourseSelected(course: Course) {
    this.currentCourse = Course.createCourseFromJson(course);
    this.apiService.getStudentsInCourse(this.currentUser.Token,
      this.currentUser.UserID, this.currentCourse.ExamID)
      .subscribe((data: any) => {
        this.students = data.CourseParticipant;
      });
  }

  onStudentClicked(students: Student[]) {
    this.students = students;

    this.setCourseColor();
  }

  initCoursesColor(){

  }

  setCourseColor() {
    let isGreen = true;
    let isBlue = false;
    let isBlack = true;
    for (let student of this.students) {
      if (student.ParExamStatus != 2)
        isGreen = false;
      if (student.ParExamStatus == 1)
        isBlue = true;
      if (student.ParExamStatus != 0)
        isBlack = false;
    }
    if (isGreen) {
      // TODO - change course status

      isBlue = false;
      isBlack = false;
      this.courseColor = 1;
    } else if (isBlue) {
      isBlack = false;
      this.courseColor = 2;
    } else if (isBlack) {
      this.courseColor = 3;
    } else {
      this.courseColor = 0;
    }
  }

  // log out => remove user + navigate to login.
  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }


}
