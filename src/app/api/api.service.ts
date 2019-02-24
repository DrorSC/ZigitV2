import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.apiUrl = "http://private-2a49c-tomax.apiary-mock.com/";
  }


  get(route: string): Observable<any> {
    let fullRoute = this.apiUrl + route;
    return this.http.get(fullRoute).
      pipe(tap(data =>
        console.log('Data from ' + fullRoute + ':\n' + JSON.stringify(data))));
  }

  login(username: string, password: string): Observable<User> {
    let getUserRoute = "DoLogin/" + username + "/" + password;
    return this.get(getUserRoute)
      .pipe(map(
        user => {
          localStorage.setItem('currentUser', user);
          return user;
        }
      ));
  }

  // get course func - adding the info needed to the api
  getCourses(token: string, userID: number): Observable<any> {
    var getCoursesRoute = "GetCourses/" + token + "/" + userID;
    return this.get(getCoursesRoute)
      .pipe(map(
        courses => {
          return courses;
        }
      ));
  }

  // get request using the user token, id and the examId to get all the students
  // participating in that course
  // get students in course func - adding the info needed to the api
  getStudentsInCourse(token: string, userID: number, examID: string): Observable<any> {
    var getStudentsRoute = "GetStudentsInCourseExam/" 
    + token + "/" + userID + "/" + examID;
    return this.get(getStudentsRoute)
      .pipe(map(
        studentList => {
          return studentList;
        }
      ));
  }

}
