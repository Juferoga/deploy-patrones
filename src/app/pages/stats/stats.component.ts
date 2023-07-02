import { Component } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent {
    data: any;
    options: any;

    bestSellersData: any;
    bestRegionData: any;
    bestProductsData: any;
    data1: { labels: any; datasets: { label: string; backgroundColor: string; borderColor: string; data: any; }[]; };
    data2: { labels: any; datasets: { label: string; backgroundColor: string; borderColor: string; data: any; }[]; };

    constructor(
        
    ) {}

    ngOnInit() {}
}
