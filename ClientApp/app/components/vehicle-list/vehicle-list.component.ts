import { IVehicle, IKeyValuePair } from './../../models/vehicle';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  filteredVehicles: IVehicle[] = [];
  vehicles: IVehicle[] = [];
  makes: IKeyValuePair[] = [];
  filter: any = {};

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes()
      .subscribe(result => this.makes = result);

    this.vehicleService.getVehicles()
      .subscribe((results: IVehicle[]) =>
        this.filteredVehicles = this.vehicles = results
      );
  }

  onFilterChange() {
    let vehicles = this.vehicles;

    if (this.filter.makeId)
      vehicles = this.vehicles.filter(v => v.make.id == this.filter.makeId);

    this.filteredVehicles = vehicles;
  }

  resetFilter() {
    this.filter = {};
    this.onFilterChange();
  }

}
