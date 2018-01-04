import { LoaderService } from './../../../services/loader.service';
import { HttpEvent } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  @Input('width') width: number = 0;
  @Input('hide') hide: boolean = true;

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.event
      .subscribe(val => {
        this.width = val.width,
        this.hide = val.hide
      });
  }

}
