import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  publishToogleButton = false
  cameraToogleButton =false
  optionOne = [
    {
      title: "Publish / Pose",
      clickFn: this.publishToogle.bind(this),
      state: this.publishToogleButton
    },
    {
      title: "Enable Camera",
      clickFn: this.cameraToogle.bind(this),
      state: this.cameraToogleButton
    }
  ]


  publishToogle() {
    this.publishToogleButton = !this.publishToogleButton
    this.optionOne[0].state = this.publishToogleButton

  }

  cameraToogle() {
    this.cameraToogleButton = !this.cameraToogleButton
    this.optionOne[1].state = this.cameraToogleButton
  }
}
