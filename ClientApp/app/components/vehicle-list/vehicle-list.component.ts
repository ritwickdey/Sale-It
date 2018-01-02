import { IVehicle, IKeyValuePair, IMake, IModel } from './../../models/vehicle';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  vehicles: IVehicle[] = [];
  makes: IMake[] = [];
  models: IModel[] = [];
  query: any = {};

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
      this.query.IsSortAscending = !this.query.IsSortAscending;
    }
    else {
      this.query.sortBy = columnName;
      this.query.IsSortAscending = true;
    }
    this.populateVehicle();
  }

  private populateVehicle() {
    this.vehicleService.getVehicles(this.query)
      .subscribe((results: IVehicle[]) => this.vehicles = results);
  }

}
