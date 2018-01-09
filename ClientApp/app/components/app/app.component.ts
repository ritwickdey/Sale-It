import { NgZone } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(
        private ngZone: NgZone,
        private toastyService: ToastyService) {

    }

    ngOnInit() {
       
           setTimeout(() => {
            this.toastyService.info({
                title: 'Moderator',
                msg: 'Account: example@example.com \n pass: 12345678',
                timeout: 5000,
                theme: 'bootstrap',
            }) 
           }, 6000);

           setTimeout(() => {
            this.toastyService.warning({
                title: 'Note',
                msg: 'Only Admin/Moderator can add/edit/delete Vehichles',
                timeout: 5000,
                theme: 'bootstrap',
            }) 
           }, 3000);
      
    }
}
