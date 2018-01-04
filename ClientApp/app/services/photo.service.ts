import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { HttpEventType } from '@angular/common/http';


@Injectable()
export class PhotoService {

  constructor(private http: HttpClient) { }

  upload(vehicleId: number, photo) {
    const formData = new FormData();
    formData.append('file', photo);

    const req = new HttpRequest('POST', `/api/vehicles/${vehicleId}/photos`, formData, {
      reportProgress: true,
    });
    return this.http.request(req)
      .catch((err: HttpErrorResponse) => Observable.throw(err));
  }

  getPhotos(vehicleId: number) {
    return this.http
      .get(`/api/vehicles/${vehicleId}/photos`, { observe: 'response' })
      .map((data: HttpResponse<any>) => data.body)
      .catch((err: HttpErrorResponse) => Observable.throw(err));
  }

}
