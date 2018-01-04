import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class LoaderService {

    event: EventEmitter<any> = new EventEmitter();
    constructor() { }

    display(event: HttpEvent<any>) {
        switch (event.type) {
            case HttpEventType.UploadProgress:
                this.event.emit({
                    width: 0.01 + event.loaded / (event.total || event.loaded) * 100,
                    hide: false
                });
                break;
            case HttpEventType.DownloadProgress:
                this.event.emit({
                    width: 0.01 + event.loaded / (event.total || event.loaded) * 100,
                    hide: false
                });
                break;
            case HttpEventType.ResponseHeader:
                this.event.emit({
                    width: 100,
                    hide: true
                });
                break;
            case HttpEventType.Sent:
                this.event.emit({
                    width: 0,
                    hide: false
                });
                break;
            case HttpEventType.Response:
                this.event.emit({
                    width: 0,
                    hide: true
                });
                break;
            default:
                this.event.emit({
                    width: 0,
                    hide: true
                });
                break;
        }
    }
}