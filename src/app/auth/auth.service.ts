import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;

  // stored URL to redirect after logging in
  redirectUrl: string;

  constructor(
    private apiService: ApiService
  ) { }

  // login get request -> returns user + token
  login(username: string, password: string): Observable<any> {
    const loginRoute = "DoLogin/";
    var getUserRoute = loginRoute + username + "/" + password;
    return this.apiService.get(getUserRoute)
    .pipe(map(
      user => {
        if(user && user.Token){
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.isLoggedIn = true;
        }
        return user;
      }
    ))
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
