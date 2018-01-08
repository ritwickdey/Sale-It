import * as Raven from 'raven-js';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ToastyModule } from 'ng2-toasty';
import { ChartModule } from 'angular2-chartjs';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { PaginationComponent } from './components/shared/pagination/pagination.component';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle.component';
import { PhotoService } from './services/photo.service';
import { LoaderComponent } from './components/shared/loader/loader.component';
import { LoaderService } from './services/loader.service';
import { AuthService } from './services/auth.service';
import { ReportComponent } from './components/report/report.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminModeratorAuthGuard } from './guards/admin-moderator-auth.guard';
import { VehicleService } from './services/vehicle.service';
import { VehicleReportService } from './services/vehicle-report.service';



Raven
    .config('https://7f92c57a5c6f444c9f3db19ece042de5@sentry.io/265466')
    .install();

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        VehicleFormComponent,
        VehicleListComponent,
        PaginationComponent,
        ViewVehicleComponent,
        LoaderComponent,
        ReportComponent
    ],
    imports: [
        HttpClientModule,
        CommonModule,
        HttpModule,
        FormsModule,
        ToastyModule.forRoot(),
        ChartModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: getToken
            }
        }),
        RouterModule.forRoot([
            { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
            { path: 'report', component: ReportComponent, canActivate: [AuthGuard] },
            { path: 'vehicles', component: VehicleListComponent },
            { path: 'vehicles/new', component: VehicleFormComponent, canActivate: [AuthGuard, AdminModeratorAuthGuard] },
            { path: 'vehicles/:id', component: ViewVehicleComponent },
            { path: 'vehicles/edit/:id', component: VehicleFormComponent, canActivate: [AuthGuard, AdminModeratorAuthGuard] },
            { path: '**', redirectTo: 'vehicles' }
        ])
    ],
    providers: [
        VehicleService,
        PhotoService,
        LoaderService,
        AuthService,
        AuthGuard,
        AdminModeratorAuthGuard,
        VehicleReportService
    ]
})
export class AppModuleShared {
}

export function getToken() {
    return localStorage.getItem('token')!;
}