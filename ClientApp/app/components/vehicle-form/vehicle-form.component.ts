import { ToastyService } from 'ng2-toasty';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/forkJoin';

import { IVehicle, ISaveVehicle } from '../../models/vehicle';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {

  makes: any[];
  models: any[];
  features: any[];
  vehicle: ISaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    features: [],
    isRegistered: false,
    contact: {
      name: '',
      phone: ''
    }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private toastyService: ToastyService
  ) { }

  ngOnInit() {
    this.vehicle.id = +this.route.snapshot.params['id'] || 0;
    const sources = [
      this.vehicleService.getFeatures(),
      this.vehicleService.getMakes(),
    ];

    if (this.vehicle.id)
      sources.push(this.vehicleService.getVehicle(this.vehicle.id));

    Observable.forkJoin(sources).subscribe(results => {
      this.features = results[0];
      this.makes = results[1];
      if (this.vehicle.id) {
        this.setVehicle(results[2]);
        this.polulateModels();
      }
    });

  }

  onMakeChange() {
    this.polulateModels();
    delete this.vehicle.modelId;
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
    const operation$ = !this.vehicle.id ? this.vehicleService.create(this.vehicle) : this.vehicleService.update(this.vehicle);
    const msg = 'Vehicle is successfully ' + (!this.vehicle.id ? 'created' : 'saved');
    operation$.subscribe((vehicle: IVehicle) => {
        this.showSuccessToast({ msg });
        this.router.navigate(['/vehicles', vehicle.id]);
      });
  }

  private showSuccessToast(obj: { title?: string; msg?: string }) {
    this.toastyService.success({
      title: obj.title || 'Success',
      msg: obj.msg || 'Done',
      theme: 'bootstrap',
      timeout: 3000
    })
  }

  private polulateModels() {
    const make = this.makes.find(e => e.id == this.vehicle.makeId);
    this.models = make ? make.models : [];
  }

  private setVehicle(v: IVehicle) {
    this.vehicle.contact = v.contact;
    this.vehicle.modelId = v.model.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.features = v.features.map(f => f.id);
    this.vehicle.isRegistered = v.isRegistered;
  }

}
