import * as Raven from 'raven-js';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandler, Inject, NgZone, isDevMode } from "@angular/core";


export class AppErrorHandler implements ErrorHandler {

    constructor(
        @Inject(NgZone) private ngZone: NgZone,
        @Inject(ToastyService) private toastyService: ToastyService
    ) { }

    handleError(error: any): void {
        if (!isDevMode)
            Raven.captureException(error.message || error);
        else
            console.log('ERROR HANDLED BY GLOBAL - Dev Mode', error);

        this.ngZone.run(() => {
            this.toastyService.error({
                title: 'Error',
                msg: 'An unexpected error happended',
                theme: 'bootstrap',
                showClose: true,
                timeout: 5000
            });
        });
    }



}