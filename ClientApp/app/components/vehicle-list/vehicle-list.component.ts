import { IVehicle, IKeyValuePair, IMake, IModel } from './../../models/vehicle';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  queryResult: any = {};
  makes: IMake[] = [];
  models: IModel[] = [];
  query: any = {
    pageSize: 3
  };
  coloums: { title?, key?, isSortable?}[] = [
    { title: 'id', key: 'id', isSortable: true },
    { title: 'Make', key: 'make', isSortable: true },
    { title: 'Model', key: 'model', isSortable: true },
    { title: 'Contact Name', key: 'contactname', isSortable: true },
    {},
  ];

  constructor(private vehicleService: VehicleService) { }
  ngOnInit() {
    this.vehicleService.getMakes()
      .subscribe(result => this.makes = result);
    this.populateVehicle();
  }

  onFilterChange() {
    this.populateVehicle();
  }

  resetFilter() {
    this.query = {};
    this.onFilterChange();
  }

  onMakeChanges() {
    this.populateMakes();
    this.onFilterChange();
    delete this.query.modelId;
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
