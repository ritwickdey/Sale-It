import { ToastyService } from 'ng2-toasty';
import { VehicleService } from './../../services/vehicle.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IVehicle } from '../../models/vehicle';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {

  vehicle: IVehicle;
  constructor(
    private vehicleService: VehicleService,
    private router: Router,
    private route: ActivatedRoute,
    private toastyService: ToastyService
  ) { }

  ngOnInit() {
    const vehicleId = this.route.snapshot.params.id;
    this.vehicleService.getVehicle(vehicleId)
      .subscribe(data =>{ 
        this.vehicle = data;
        console.log(data)
      })
  }

  onDelete() {
    if (confirm('Are you sure?')) {
      this.vehicleService
        .delete(this.vehicle.id)
        .subscribe(x => {
          this.showSuccessToast({
            title: 'Deleted',
            msg: 'Vehicle is successfully deleted'
          });
          this.router.navigateByUrl('/');
        });
    }
  }

  private showSuccessToast(obj: { title?: string; msg?: string }) {
    this.toastyService.success({
      title: obj.title || 'Success',
      msg: obj.msg || 'Done',
      theme: 'bootstrap',
      timeout: 3000
    })
  }

}
