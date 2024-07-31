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
      state: () => {return !this.publishToogleButton}
    },
    {
      title: "Enable Camera",
      clickFn: this.cameraToogle.bind(this),
      state: () => {return !this.cameraToogleButton}
    }
  ]


  publishToogle() {
    this.publishToogleButton = !this.publishToogleButton
    console.log("Hello")
    return this.publishToogleButton

  }

  cameraToogle() {
    this.cameraToogleButton = !this.cameraToogleButton
    return this.cameraToogleButton
  }
}
