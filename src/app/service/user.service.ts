import { Injectable } from '@angular/core';
import { Headers, Http } from "@angular/http";
import { AuthenticationService } from '../service/authentication.service';
import 'rxjs/add/operator/toPromise';
 
import { User } from '../model/user'

@Injectable()
export class UserService {
  
  //To be externalized
  private usersUrl = 'http://localhost:8080/users';
  
   private headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authenticationService.getToken()
      });
  
   constructor(
     private http: Http,
     private authenticationService: AuthenticationService) {
   }

   getUsers(): Promise<User[]> {
    return this.http
     .get(this.usersUrl, {headers: this.headers})
     .toPromise()
     .then(response => response.json()._embedded.users as User[])
     .catch(this.handleError);

 }

 private handleError(error: any): Promise<any> {
   console.error('An error occurred: ', error);
   return Promise.reject(error.message || error);
 }


 getHero(id: number): Promise<User> {
   return this.getUsers()
     .then(users => users.find(user => user.id === id))
 }

 create(name: string): Promise<User> {
   return this.http
     .post(this.usersUrl, JSON.stringify({firstName: name}), {headers: this.headers})
     .toPromise()
     .then(res => res.json())
     .catch(this.handleError)
 }

 update(user: User): Promise<User> {
   const url = `${this.usersUrl}/${user.id}`;
   return this.http
     .put(url, JSON.stringify(user), {headers: this.headers})
     .toPromise()
     .then(() => user)
     .catch(this.handleError);
 }

 delete(id: number): Promise<void> {
   console.log(`user.service - deleting ${id}`);
   const url = `${this.usersUrl}/${id}`;
   return this.http
     .delete(url, {headers: this.headers})
     .toPromise()
     .then(() => null)
     .catch(this.handleError);
 }
}
