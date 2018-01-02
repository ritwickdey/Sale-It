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
  filter: any = {};

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
    this.filter = {};
    this.onFilterChange();
  }

  onMakeChanges() {
    this.populateMakes();
    this.onFilterChange();
    delete this.filter.modelId;
  }

  onModelChnages() {
    this.onFilterChange();
  }

  populateMakes() {
    const make: IMake = this.makes.find(e => e.id == this.filter.makeId) || {} as IMake;
    this.models = make.models;
  }

  private populateVehicle() {
    this.vehicleService.getVehicles(this.filter)
      .subscribe((results: IVehicle[]) => this.vehicles = results);
  }

}
