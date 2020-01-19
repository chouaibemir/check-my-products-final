import { Component, OnInit, AfterViewInit } from '@angular/core';
import {Chart} from 'chart.js';
import { TopicValuesService } from './shared/services/topic-values.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  LineChart = [];
  BarChart = [];
  PieChart: any;
  subscription: Subscription;
  tableColor: string[];

 constructor(private topicValuesService: TopicValuesService) {
    this.subscription = this.topicValuesService.getMessage().subscribe(
        () => {
        if (this.PieChart) {
            this.PieChart.destroy();
        }
            this.PieChart = this.createPieChart();
        }
    );
 }
  ngAfterViewInit() {
    if (this.PieChart) {
        this.PieChart.destroy();
    }
    this.PieChart = this.createPieChart();

}

    createPieChart() {
        this.generateColorTable(this.topicValuesService.getTopicNames().length);
        return new Chart('pieChart', {
            type: 'pie',
            data: {
            labels: this.topicValuesService.getTopicNames(),
            datasets: [{
                label: '# of posts by topic',
                data: this.topicValuesService.getTopicProductsCount(),
                backgroundColor: this.tableColor,
                borderColor: this.tableColor,
                borderWidth: 1
            }]
            },
            options: {
            title: {
                text: 'Pie Chart',
                display: true
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
            }
            });


            }

            generateColorTable(length: number) {
                const tab = [];
                let a, b, c;
                for (let i = 0; i < length; i++) {
                 a = Math.round(Math.random() * 230);
                 b = Math.round(Math.random() * 230);
                 c = Math.round(Math.random() * 230);
                    tab.push(`rgba(${a}, ${b}, ${c}, 0.2)`);
                }
                this.tableColor = tab;
            }
    }
