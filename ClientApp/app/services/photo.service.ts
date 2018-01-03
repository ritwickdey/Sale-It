import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class PhotoService {

  constructor(private http: HttpClient) { }

  upload(vehicleId: number, photo) {
    const formData = new FormData();
    formData.append('file', photo);
    return this.http
      .post(`/api/vehicles/${vehicleId}/photos`, formData, { observe: 'response' })
      .map((data: HttpResponse<any>) => data.body)
      .catch((err: HttpErrorResponse) => Observable.throw(err));
  }

}
