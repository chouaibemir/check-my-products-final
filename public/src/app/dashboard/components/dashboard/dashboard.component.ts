import { Component, OnInit } from '@angular/core';
import { TopicValuesService } from 'src/app/shared/services/topic-values.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private topicValuesService: TopicValuesService ) { }

  ngOnInit() {}

}
