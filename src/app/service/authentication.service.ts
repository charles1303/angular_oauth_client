import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { LocalForageService } from 'ngx-localforage';

@Injectable()
export class AuthenticationService {
  
  //To be externalized
  private authUrl = 'http://localhost:8080/oauth/token';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http, private localForage: LocalForageService) {
  }

  login(username: string, password: string): Observable<boolean> {
      return this.http.post(this.authUrl, JSON.stringify({username: username, password: password}), {headers: this.headers})
          .map((response: Response) => {
              // login successful if there's a jwt token in the response
              let token = response.json() && response.json().token;
              if (token) {
                  // store username and jwt token in local storage to keep user logged in between page refreshes
                  this.localForage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

                  // return true to indicate successful login
                  return true;
              } else {
                  // return false to indicate failed login
                  return false;
              }
          }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  isLoggedIn(): boolean {
    var token: String = this.getToken();
    return token && token.length > 0;
  }

  getToken(): String {
      var token = "";
    this.localForage.getItem('currentUser').subscribe(function(value) {
        var currentUser = JSON.parse(value);
        token = currentUser && currentUser.token;
        
    });
    return token ? token : "";
  }

  logout(): void {
      // clear token remove user from local storage to log user out
      this.localForage.removeItem('currentUser');
  }
}
