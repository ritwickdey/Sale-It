import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class VehicleService {

  constructor(private http: HttpClient) { }

  getMakes() {
    return this.http
      .get('/api/makes', { observe: 'response' })
      .map((data: HttpResponse<any>) => data.body)
      .catch((err: HttpErrorResponse) => Observable.throw(err));
  }

  getFeatures() {
    return this.http
      .get('/api/features', { observe: 'response' })
      .map((data: HttpResponse<any>) => data.body)
      .catch((err: HttpErrorResponse) => Observable.throw(err));
  }

  create(vehicle) {
    return this.http
      .post('/api/vehicles', vehicle, { observe: 'response' })
      .map((data: HttpResponse<any>) => data.body)
      .catch((err: HttpErrorResponse) => Observable.throw(err));
  }

}
