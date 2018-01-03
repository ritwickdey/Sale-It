import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input('total-items') totalItems: number;
  @Input('page-size') pageSize: number = 10;
  @Output('page-changed') pageChanged = new EventEmitter();

  pages: number[] = [];
  currentPage: number = 1;

  constructor() { }

  ngOnInit() {
    const pageCount = Math.ceil(this.totalItems / this.pageSize);
    for (let i = 1; i <= pageCount; i++)
      this.pages.push(i);
  }

  next() {
    if (this.currentPage < this.pages.length) 
      this.pageChanged.emit(++this.currentPage);
  }

  previous() {
    if (this.currentPage > 1)
      this.pageChanged.emit(--this.currentPage);
  }

  pageChange(val: number) {
    this.currentPage = val;
    this.pageChanged.emit(this.currentPage); 
  }

}
