import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user'
import { UserService } from '../service/user.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users : User[] = [];

  constructor(private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUsers()
    .then(
      users => this.users = users,
      error => {
        this.router.navigate(['home']);
        console.error('An error occurred in dashboard component, navigating to home: ', error);
      }
    );
  }

}
