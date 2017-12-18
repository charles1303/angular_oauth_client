import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { LocalForageService } from 'ngx-localforage';

@Injectable()
export class RequestService {
  
  //To be externalized
  private requestsUrl = 'http://localhost:8080/requests';
  
    constructor(private http: HttpClient, private localForage: LocalForageService) { }
  
    getRequests() {
      return this.http
        .get(this.requestsUrl, {
          headers: new HttpHeaders().set('Authorization', `Bearer ${this.localForage.getItem('token')}`)
        })
        .pipe(
          catchError(this.handleError)
        );
    }
  
    private handleError(err: HttpErrorResponse | any) {
      console.error('An error occurred', err);
      return Observable.throw(err.message || err);
    }
}
