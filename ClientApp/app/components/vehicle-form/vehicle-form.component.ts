import { MakeService } from './../../services/make.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {

  makes: any[];
  vehicle : { make:null, models: any[] } = { make: null, models: [] };

  constructor(private makeService: MakeService) { }

  ngOnInit() {
    this.makeService.getMakes() 
      .subscribe(data => {
        this.makes = data;
        console.log(data);
      });
  }

  onMakeChange() {
    const make = this.makes.find(e => e.id == this.vehicle.make);
    this.vehicle.models = make ? make.models : [];
    console.log(this.vehicle.models);
  }

}
