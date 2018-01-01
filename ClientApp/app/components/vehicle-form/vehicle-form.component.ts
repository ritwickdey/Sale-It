import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {

  makes: any[];
  models: any[];
  features: any[];
  vehicle: any = {
    features: [],
    contact: {},
    isRegistered: false
  };

  constructor(
    private vehicleService: VehicleService
  ) { }

  ngOnInit() {
    this.vehicleService.getMakes()
      .subscribe(data => {
        this.makes = data;
        console.log(data);
      });

    this.vehicleService.getFeatures()
      .subscribe(data => {
        this.features = data;
        console.log(data);
      });

  }

  onMakeChange() {
    const make = this.makes.find(e => e.id == this.vehicle.makeId);
    this.models = make ? make.models : [];
    console.log(this.models);
    this.vehicle.modelId = undefined;
  }

  onFeatureToggle(featureId, event) {
    if (event.target.checked)
      this.vehicle.features.push(featureId)
    else {
      const index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }

  submit() {
    this.vehicleService.create(this.vehicle)
      .subscribe(
        x => console.log(x)
      );
  }

}
