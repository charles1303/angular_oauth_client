import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, Injectable, NgModule} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ErrorLogService} from '../service/error-log.service';

@Injectable()
export class GlobalErrorHandlerService extends ErrorHandler{
  constructor(private errorLogService: ErrorLogService) {
    super();
}

handleError(error) {
    this.errorLogService.logError(error);
}
}
