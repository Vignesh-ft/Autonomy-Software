import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent{
  startDate:string = ""
  endDate:string = ""

  showValue() {
    console.log([this.startDate, this.endDate])
  }

}
