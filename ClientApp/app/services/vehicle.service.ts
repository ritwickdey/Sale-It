import { ISaveVehicle } from './../models/vehicle';
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

  update(vehicle: ISaveVehicle) {
    return this.http
      .put('/api/vehicles/' + vehicle.id, vehicle, { observe: 'response' })
      .map((data: HttpResponse<any>) => data.body)
      .catch((err: HttpErrorResponse) => Observable.throw(err));
  }

  delete(id: number) {
    return this.http
      .delete('/api/vehicles/' + id, { observe: 'response' })
      .map((data: HttpResponse<any>) => data.body)
      .catch((err: HttpErrorResponse) => Observable.throw(err));
  }

  getVehicle(id: number) {
    return this.http
      .get('/api/vehicles/' + id, { observe: 'response' })
      .map((data: HttpResponse<any>) => data.body)
      .catch((err: HttpErrorResponse) => Observable.throw(err));
  }

  getVehicles(filter) {
    return this.http
      .get('/api/vehicles' + '?' + this.toQueryString(filter), { observe: 'response' })
      .map((data: HttpResponse<any>) => data.body)
      .catch((err: HttpErrorResponse) => Observable.throw(err));
  }

  private toQueryString(obj: object): string {
    return Object.keys(obj)
      .filter(key => obj[key] != undefined || obj[key] != null)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
      .join('&');
  }

}
