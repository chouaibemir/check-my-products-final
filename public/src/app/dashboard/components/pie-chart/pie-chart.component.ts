import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { TopicValuesService } from 'src/app/shared/services/topic-values.service';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements AfterViewInit {
  @Input()
  public pieChartLabels: string[] ;

  @Input()
  public pieChartData: number[] ;
  LineChart = [];
  BarChart = [];
  PieChart: Chart;


  constructor(private topicvaluesService: TopicValuesService) {
  }

  ngAfterViewInit() {
    this.setUpPieChart();
  }

  setUpPieChart() {
    this.PieChart = new Chart('canvas', {
      type: 'pie',
    data: {
     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
     datasets: [{
         label: '# of Categories',
         data: [9, 7 , 3, 5, 2, 10],
         backgroundColor: [
          '#3cb371',
          '#0000FF',
          '#9966FF',
          '#4C4CFF',
          '#00FFFF',
          '#f990a7',
          '#aad2ed',
          '#FF00FF',
          'Blue',
          'Red',
          'Blue'
        ],
         fill: true,
         borderColor: [
             'rgba(255,99,132,1)',
             'rgba(54, 162, 235, 1)',
             'rgba(255, 206, 86, 1)',
             'rgba(75, 192, 192, 1)',
             'rgba(153, 102, 255, 1)',
             'rgba(255, 159, 64, 1)'
         ],
         borderWidth: 1
     }]
    },
    options: {
     title: {
         text: 'Bar Chart',
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


}
