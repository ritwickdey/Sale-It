import { AuthService } from './../../services/auth.service';
import { IVehicle, IKeyValuePair, IMake, IModel } from './../../models/vehicle';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  private readonly PAGE_SIZE = 5;

  queryResult: any = {};
  makes: IMake[] = [];
  models: IModel[] = [];
  query: any = {
    pageSize: this.PAGE_SIZE
  };
  coloums: { title?, key?, isSortable?}[] = [
    { title: 'id', key: 'id', isSortable: true },
    { title: 'Make', key: 'make', isSortable: true },
    { title: 'Model', key: 'model', isSortable: true },
    { title: 'Contact Name', key: 'contactname', isSortable: true },
    {},
  ];

  constructor(
    private vehicleService: VehicleService,
    public authService: AuthService
  ) { }
  ngOnInit() {
    this.vehicleService.getMakes()
      .subscribe(result => this.makes = result);
    this.populateVehicle();
  }

  onFilterChange() {
    this.query.page = 1;
    this.query.pageSize = this.PAGE_SIZE;
    this.populateVehicle();
  }

  resetFilter() {
    this.query = {
      page: 1,
      pageSize: this.PAGE_SIZE
    };
    this.populateVehicle();
  }

  onMakeChanges() {
    this.populateMakes();
    delete this.query.modelId;
    this.onFilterChange();
  }

  onModelChnages() {
    this.onFilterChange();
  }

  populateMakes() {
    const make: IMake = this.makes.find(e => e.id == this.query.makeId) || {} as IMake;
    this.models = make.models;
  }

  sortBy(columnName: string) {
    if (this.query.sortBy === columnName) {
      this.query.isSortAscending = !this.query.isSortAscending;
    }
    else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }

    this.query.page = 1;
    this.queryResult.totalItems += 0.1; //tricky way ^_^
    this.populateVehicle();
  }

  onPageChnaged(val) {
    this.query.page = val;
    this.populateVehicle();
  }

  private populateVehicle() {
    this.vehicleService.getVehicles(this.query)
      .subscribe(results => this.queryResult = results);
  }

}
