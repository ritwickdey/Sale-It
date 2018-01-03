import { PhotoService } from './../../services/photo.service';
import { ToastyService } from 'ng2-toasty';
import { VehicleService } from './../../services/vehicle.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { IVehicle } from '../../models/vehicle';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef
  vehicle: IVehicle;
  photos: any[] = [];

  constructor(
    private vehicleService: VehicleService,
    private photoService: PhotoService,
    private router: Router,
    private route: ActivatedRoute,
    private toastyService: ToastyService
  ) { }

  ngOnInit() {
    const vehicleId = this.route.snapshot.params.id;
    this.vehicleService.getVehicle(vehicleId)
      .subscribe(data => this.vehicle = data);

    this.photoService.getPhotos(vehicleId)
      .subscribe(data => this.photos = data);
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

  uploadPhoto() {
    const nativeElem: HTMLInputElement = this.fileInput.nativeElement;
    this.photoService.upload(this.vehicle.id, nativeElem.files![0])
      .subscribe(photo => {
        nativeElem.value = '';
        this.showSuccessToast({
          msg: 'The photo is uploaded successfully'
        });
        this.photos.push(photo);
      });
  }

  private showSuccessToast(obj?: { title?: string; msg?: string }) {
    this.toastyService.success({
      title: obj!.title || 'Success',
      msg: obj!.msg || 'Done',
      theme: 'bootstrap',
      timeout: 3000
    })
  }

}
