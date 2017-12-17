import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Arequest } from '../model/arequest';
import { AuthService } from '../auth/auth.service';
import { RequestService } from '../service/request.service';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent implements OnInit, OnDestroy {

  requestSub: Subscription;
  requests: Arequest[];
  error: any;

  constructor(public requestService: RequestService,  public authService: AuthService) { 

  }

  ngOnInit() {
    this.requestSub = this.requestService
    .getRequests()
    .subscribe(
      requests => this.requests = requests,
      err => this.error = err
    );
  }

  ngOnDestroy() {
    this.requestSub.unsubscribe();
  }

}
