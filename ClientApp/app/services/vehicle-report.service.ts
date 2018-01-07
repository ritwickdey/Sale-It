import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class VehicleReportService {

    constructor(private http: HttpClient) { }

    getReport() {
        return this.http
            .get('/api/VehicleReport', { observe: 'response' })
            .map((data: HttpResponse<any>) => data.body)
            .catch((err: HttpErrorResponse) => Observable.throw(err));
    }
}