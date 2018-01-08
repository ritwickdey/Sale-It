import { VehicleReportService } from '../../services/vehicle-report.service';
import { Component, OnInit } from '@angular/core';

export interface IChartData {
    labels?: string[],
    datasets?: {
        data?: number[],
        backgroundColor?: string[]
    }[]
}

@Component({
    template: `
        <h1>Vehicles Report</h1>
        <div class="chart-size">
            <chart *ngIf="data" type="doughnut" [data]="data" ></chart>
        </div>
    `,
    styleUrls : ['report.component.css']
    
})

export class ReportComponent implements OnInit {

    data: IChartData;

    constructor(private vehicleReportService: VehicleReportService) { }

    ngOnInit() {
        this.vehicleReportService.getReport()
            .subscribe(results => {
                console.log(results);
                this.data = this.mapResultToChartData(results);
            });
    }

    private mapResultToChartData(results: any[]): IChartData {
        const data: IChartData = {
            labels: results.map(e => e.makeName),
            datasets: [
                {
                    data: results.map(e => e.totalVehicles),
                    backgroundColor: this.getColors(true)
                }
            ]
        }
        console.log(data.datasets![0].backgroundColor);
        return data;
    }

    private getColors(shuffled = false) {
        const colors = [
            '#3366CC',
            '#DC3912',
            '#FF9900',
            '#109618',
            '#990099',
            '#3B3EAC',
            '#0099C6',
            '#DD4477',
            '#66AA00',
            '#B82E2E',
            '#316395',
            '#994499',
            '#22AA99',
            '#AAAA11',
            '#6633CC',
            '#E67300',
            '#8B0707',
            '#329262',
            '#5574A6',
            '#3B3EAC',
            '#ff6384',
            '#36a2eb',
            '#ffce56',
        ]

        return !shuffled ? colors : this.suffledArray(colors);
    }

    private suffledArray(arr) {
        return arr
            .map((a) => ({ sort: Math.random(), value: a }))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => a.value);
    }
}
