import { IVehicle, IKeyValuePair } from './../../models/vehicle';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  vehicles: IVehicle[] = [];
  makes: IKeyValuePair[] = [];
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

  private populateVehicle() {
    this.vehicleService.getVehicles(this.filter)
      .subscribe((results: IVehicle[]) => this.vehicles = results);
  }

  resetFilter() {
    this.filter = {};
    this.onFilterChange();
  }

}
