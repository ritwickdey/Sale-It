import * as Raven from 'raven-js';
import { HttpClientModule } from '@angular/common/http';
import { VehicleService } from './services/vehicle.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ToastyModule } from 'ng2-toasty';
import { ChartModule } from 'angular2-chartjs';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { PaginationComponent } from './components/shared/pagination/pagination.component';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle.component';
import { PhotoService } from './services/photo.service';
import { LoaderComponent } from './components/shared/loader/loader.component';
import { LoaderService } from './services/loader.service';
import { AuthService } from './services/auth.service';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { JwtModule } from '@auth0/angular-jwt';

Raven
    .config('https://7f92c57a5c6f444c9f3db19ece042de5@sentry.io/265466')
    .install();

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        VehicleFormComponent,
        VehicleListComponent,
        PaginationComponent,
        ViewVehicleComponent,
        LoaderComponent,
        AdminComponent
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
                tokenGetter: () => localStorage.getItem('token')!
            }
        }),
        RouterModule.forRoot([
            { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
            { path: 'admin', component: AdminComponent, canActivate: [AuthGuardService, AdminAuthGuardService] },
            { path: 'vehicles', component: VehicleListComponent },
            { path: 'vehicles/new', component: VehicleFormComponent, canActivate: [AuthGuardService] },
            { path: 'vehicles/:id', component: ViewVehicleComponent },
            { path: 'vehicles/edit/:id', component: VehicleFormComponent, canActivate: [AuthGuardService] },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'vehicles' }
        ])
    ],
    providers: [
        VehicleService,
        PhotoService,
        LoaderService,
        AuthService,
        AuthGuardService,
        AdminAuthGuardService
    ]
})
export class AppModuleShared {
}
